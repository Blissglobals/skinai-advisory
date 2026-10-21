import type { NormalizedLandmark } from "@mediapipe/tasks-vision";
import {
  getFaceLandmarker,
  detectLandmarksForVideoFrame,
  computeSymmetryScore,
  computeElasticityScore,
  cropSquare,
  faceWidthPx,
  zoneCenters,
  ZONE_SIZE,
} from "./landmarks";
import { poreScore, wrinkleScore, pigmentScore } from "./pixelHeuristics";
import { estimateAge } from "./ageEstimation";
import { trimmedMean } from "./scoring";
import { fitzpatrickFromLab, meanLab, undertoneFromLab, type FitzpatrickType } from "./fitzpatrick";
import {
  analyzeFrameLighting,
  maxGainDeviation,
  HARD_MIN_BRIGHTNESS,
  SOFT_MIN_BRIGHTNESS,
  HARD_CAST_DEVIATION,
  type FrameLightAnalysis,
} from "@/lib/whiteBalance";
import type {
  AnalysisEngine,
  AnalysisMessages,
  DeepScanResult,
  FaceScanResult,
  PersonalColorSeason,
  SkinMetricKey,
  SkinMetricScore,
  UndertoneKey,
} from "./types";

type Source = HTMLVideoElement | HTMLCanvasElement;

const SAMPLE_COUNT = 5;
const SAMPLE_INTERVAL_MS = 80;
const MIN_VALID_SAMPLES = 3;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function average(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function mostFrequent<T extends string>(values: T[]): T {
  const counts = new Map<T, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  let best = values[0];
  let bestCount = 0;
  for (const [v, c] of counts) {
    if (c > bestCount) {
      best = v;
      bestCount = c;
    }
  }
  return best;
}

function sourceSize(source: Source): { width: number; height: number } {
  return source instanceof HTMLVideoElement
    ? { width: source.videoWidth, height: source.videoHeight }
    : { width: source.width, height: source.height };
}

/** 얼굴 폭에 비례한 크기로, 지정한 피부 지점들을 잘라 128px 크롭 목록으로 돌려줍니다. */
function skinCrops(source: Source, landmarks: NormalizedLandmark[], key: SkinMetricKey): ImageData[] {
  const { width, height } = sourceSize(source);
  const size = faceWidthPx(landmarks, width, height) * ZONE_SIZE[key];
  return zoneCenters(landmarks)[key].map((center) => cropSquare(source, center, size));
}

// 조명·색편차 판정용 넓은 얼굴 크롭(기존 품질 기준값이 이 범위에 맞춰져 있음).
function lightingCrop(source: Source, landmarks: NormalizedLandmark[]): ImageData {
  const { width, height } = sourceSize(source);
  const [a, b] = zoneCenters(landmarks).pore;
  return cropSquare(source, { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, faceWidthPx(landmarks, width, height) * 0.8);
}

// forceAccept가 true면(사용자가 "그래도 진행하기"를 선택한 경우) 어둡거나
// 색편차가 심해도 통과시키고 lowConfidence로만 표시합니다. 얼굴이 한 번도
// 인식되지 않았으면 계산 자체가 불가능해 항상 재촬영을 요구합니다.
function assessCaptureQuality(
  validSampleCount: number,
  rawAnalyses: FrameLightAnalysis[],
  messages: AnalysisMessages,
  forceAccept: boolean
): { lowConfidence: boolean } {
  if (validSampleCount === 0) throw new Error(messages.faceNotDetected);
  if (!forceAccept && validSampleCount < MIN_VALID_SAMPLES) throw new Error(messages.faceNotDetected);

  const avgBrightness = average(rawAnalyses.map((a) => a.brightness));
  if (!forceAccept && avgBrightness < HARD_MIN_BRIGHTNESS) throw new Error(messages.tooDark);

  const hardCastCount = rawAnalyses.filter((a) => maxGainDeviation(a.gains) >= HARD_CAST_DEVIATION).length;
  if (!forceAccept && hardCastCount > rawAnalyses.length / 2) throw new Error(messages.colorCastSevere);

  const softCastCount = rawAnalyses.filter((a) => !a.isColorBalanced).length;
  return {
    lowConfidence:
      forceAccept || softCastCount > rawAnalyses.length / 2 || avgBrightness < SOFT_MIN_BRIGHTNESS,
  };
}

function classifyPersonalColorSeason(lightness: number, undertone: UndertoneKey): PersonalColorSeason {
  if (undertone === "neutral") return "neutral";
  // ponytail: L* 고정 경계값(보정 필요). 노출에 따라 흔들리므로 재미 요소로만 씁니다.
  const isBright = lightness > 62;
  if (undertone === "warm") return isBright ? "spring_warm" : "autumn_warm";
  return isBright ? "summer_cool" : "winter_cool";
}

function estimateAgeRangeFallback(compositeScore: number, messages: AnalysisMessages): string {
  if (compositeScore >= 85) return messages.ageFallback.early20s;
  if (compositeScore >= 70) return messages.ageFallback.late20sEarly30s;
  if (compositeScore >= 55) return messages.ageFallback.mid30s;
  if (compositeScore >= 40) return messages.ageFallback.forties;
  return messages.ageFallback.lateForties;
}

/**
 * 촬영 프레임(영상 또는 캔버스)을 여러 번 샘플링해 얼굴을 분석합니다.
 * 색(피부톤·언더톤)은 화이트밸런스 보정 없이 카메라 원본 색으로 계산합니다 —
 * 프레임 평균으로 맞추는 보정은 얼굴이 화면을 채울수록 피부색 자체를 회색으로 지워서
 * "가까이 찍을수록 쿨톤·밝은 피부"로 쏠리는 문제가 있었습니다.
 */
export class MediaPipeAnalysisEngine implements AnalysisEngine {
  async scanFace(
    source: Source,
    messages: AnalysisMessages,
    _metricLabels: Record<SkinMetricKey, string>,
    forceAccept: boolean = false
  ): Promise<FaceScanResult> {
    const landmarker = await getFaceLandmarker();

    const symmetryScores: number[] = [];
    const lightness: number[] = [];
    const undertones: UndertoneKey[] = [];
    const fitzpatricks: FitzpatrickType[] = [];
    const textureScores: number[] = [];
    const rawAnalyses: FrameLightAnalysis[] = [];

    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const landmarks = detectLandmarksForVideoFrame(
        landmarker,
        source,
        performance.now(),
        messages.cameraNotReady
      );
      if (landmarks) {
        symmetryScores.push(computeSymmetryScore(landmarks));
        const colorCrops = skinCrops(source, landmarks, "pigment");
        rawAnalyses.push(analyzeFrameLighting(lightingCrop(source, landmarks)));
        const lab = meanLab(colorCrops);
        lightness.push(lab.l);
        undertones.push(undertoneFromLab(lab));
        fitzpatricks.push(fitzpatrickFromLab(lab));
        textureScores.push(average(skinCrops(source, landmarks, "pore").map(poreScore)));
      }
      if (i < SAMPLE_COUNT - 1) await sleep(SAMPLE_INTERVAL_MS);
    }

    const { lowConfidence } = assessCaptureQuality(symmetryScores.length, rawAnalyses, messages, forceAccept);

    const symmetryScore = Math.round(trimmedMean(symmetryScores));
    const undertone = mostFrequent(undertones);
    const compositeScore = Math.round((symmetryScore + trimmedMean(textureScores)) / 2);

    let estimatedAgeRange: string;
    try {
      const ageEstimate = await estimateAge(source, messages);
      estimatedAgeRange = ageEstimate
        ? ageEstimate.ageRangeLabel
        : estimateAgeRangeFallback(compositeScore, messages);
    } catch {
      estimatedAgeRange = estimateAgeRangeFallback(compositeScore, messages);
    }

    return {
      fitzpatrick: mostFrequent(fitzpatricks),
      undertone,
      personalColorSeason: classifyPersonalColorSeason(average(lightness), undertone),
      symmetryScore,
      estimatedAgeRange,
      lowConfidence,
    };
  }

  async scanZone(
    source: Source,
    _focusMetric: SkinMetricKey,
    messages: AnalysisMessages,
    metricLabels: Record<SkinMetricKey, string>,
    forceAccept: boolean = false
  ): Promise<DeepScanResult> {
    const landmarker = await getFaceLandmarker();
    const scoreSamples: Record<SkinMetricKey, number[]> = {
      pore: [],
      wrinkle: [],
      pigment: [],
      elasticity: [],
    };
    const rawAnalyses: FrameLightAnalysis[] = [];
    let sampledCount = 0;

    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const landmarks = detectLandmarksForVideoFrame(
        landmarker,
        source,
        performance.now(),
        messages.cameraNotReady
      );
      if (landmarks) {
        sampledCount++;
        const pigmentCrops = skinCrops(source, landmarks, "pigment");
        rawAnalyses.push(analyzeFrameLighting(lightingCrop(source, landmarks)));
        scoreSamples.pore.push(average(skinCrops(source, landmarks, "pore").map(poreScore)));
        scoreSamples.wrinkle.push(average(skinCrops(source, landmarks, "wrinkle").map(wrinkleScore)));
        scoreSamples.pigment.push(average(pigmentCrops.map(pigmentScore)));
        scoreSamples.elasticity.push(computeElasticityScore(landmarks));
      }
      if (i < SAMPLE_COUNT - 1) await sleep(SAMPLE_INTERVAL_MS);
    }

    const { lowConfidence } = assessCaptureQuality(sampledCount, rawAnalyses, messages, forceAccept);

    const metricKeys = Object.keys(scoreSamples) as SkinMetricKey[];
    const metrics: SkinMetricScore[] = metricKeys.map((key) => ({
      key,
      label: metricLabels[key],
      score: Math.round(trimmedMean(scoreSamples[key])),
    }));
    const overallScore = Math.round(metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length);

    return { metrics, overallScore, lowConfidence };
  }
}

export const analysisEngine: AnalysisEngine = new MediaPipeAnalysisEngine();
