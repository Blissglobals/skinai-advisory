import {
  getFaceLandmarker,
  detectLandmarksForVideoFrame,
  computeSymmetryScore,
  computeElasticityScore,
  cropRegionToImageData,
  ZONE_REGIONS,
  LANDMARK,
} from "./landmarks";
import {
  textureVarianceScore,
  edgeDensityScore,
  colorEvennessScore,
} from "./pixelHeuristics";
import { estimateAge } from "./ageEstimation";
import { trimmedMean } from "./scoring";
import {
  computeFitzpatrickFromImageData,
  type FitzpatrickType,
} from "./fitzpatrick";
import {
  analyzeFrameLighting,
  applyWhiteBalance,
  maxGainDeviation,
  HARD_MIN_BRIGHTNESS,
  SOFT_MIN_BRIGHTNESS,
  HARD_CAST_DEVIATION,
  type FrameLightAnalysis,
  type WhiteBalanceGains,
} from "@/lib/whiteBalance";
import {
  type AnalysisEngine,
  type AnalysisMessages,
  type DeepScanResult,
  type FaceScanResult,
  type PersonalColorSeason,
  type SkinMetricKey,
  type SkinMetricScore,
  type UndertoneKey,
} from "./types";

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

// forceAccept가 true면(사용자가 "그래도 진행하기"를 선택한 경우) 어둡거나
// 색편차가 심해도 통과시키고 lowConfidence로만 표시합니다. 다만 얼굴이
// 사실상 전혀 인식되지 않은 경우(0개)는 점수 계산 자체가 불가능해
// forceAccept와 무관하게 항상 재촬영을 요구합니다.
function assessCaptureQuality(
  validSampleCount: number,
  rawAnalyses: FrameLightAnalysis[],
  messages: AnalysisMessages,
  forceAccept: boolean
): { lowConfidence: boolean } {
  if (validSampleCount === 0) {
    throw new Error(messages.faceNotDetected);
  }
  if (!forceAccept && validSampleCount < MIN_VALID_SAMPLES) {
    throw new Error(messages.faceNotDetected);
  }

  const avgBrightness = average(rawAnalyses.map((a) => a.brightness));
  if (!forceAccept && avgBrightness < HARD_MIN_BRIGHTNESS) {
    throw new Error(messages.tooDark);
  }

  const hardCastCount = rawAnalyses.filter(
    (a) => maxGainDeviation(a.gains) >= HARD_CAST_DEVIATION
  ).length;
  if (!forceAccept && hardCastCount > rawAnalyses.length / 2) {
    throw new Error(messages.colorCastSevere);
  }

  const softCastCount = rawAnalyses.filter((a) => !a.isColorBalanced).length;
  const lowConfidence =
    forceAccept ||
    softCastCount > rawAnalyses.length / 2 ||
    avgBrightness < SOFT_MIN_BRIGHTNESS;

  return { lowConfidence };
}

function computeBrightness(imageData: ImageData): number {
  const { data } = imageData;
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    total += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }
  return total / (data.length / 4);
}

function classifyUndertone(imageData: ImageData): UndertoneKey {
  const { data } = imageData;
  let totalR = 0;
  let totalB = 0;
  for (let i = 0; i < data.length; i += 4) {
    totalR += data[i];
    totalB += data[i + 2];
  }
  const ratio = totalR / Math.max(totalB, 1);
  if (ratio > 1.15) return "warm";
  if (ratio < 1.05) return "cool";
  return "neutral";
}

function classifyPersonalColorSeason(
  brightness: number,
  undertone: UndertoneKey
): PersonalColorSeason {
  if (undertone === "neutral") return "neutral";
  const isBright = brightness > 155;
  if (undertone === "warm") return isBright ? "spring_warm" : "autumn_warm";
  return isBright ? "summer_cool" : "winter_cool";
}

function estimateAgeRangeFallback(
  compositeScore: number,
  messages: AnalysisMessages
): string {
  if (compositeScore >= 85) return messages.ageFallback.early20s;
  if (compositeScore >= 70) return messages.ageFallback.late20sEarly30s;
  if (compositeScore >= 55) return messages.ageFallback.mid30s;
  if (compositeScore >= 40) return messages.ageFallback.forties;
  return messages.ageFallback.lateForties;
}

function requireVideo(
  source: HTMLVideoElement | HTMLCanvasElement,
  messages: AnalysisMessages
): HTMLVideoElement {
  if (!(source instanceof HTMLVideoElement)) {
    throw new Error(messages.videoOnly);
  }
  return source;
}

export class MediaPipeAnalysisEngine implements AnalysisEngine {
  async scanFace(
    source: HTMLVideoElement | HTMLCanvasElement,
    messages: AnalysisMessages,
    _metricLabels: Record<SkinMetricKey, string>,
    gains?: WhiteBalanceGains,
    forceAccept: boolean = false
  ): Promise<FaceScanResult> {
    const video = requireVideo(source, messages);
    const landmarker = await getFaceLandmarker();

    const symmetryScores: number[] = [];
    const brightnessSamples: number[] = [];
    const undertoneSamples: UndertoneKey[] = [];
    const fitzpatrickSamples: FitzpatrickType[] = [];
    const textureScores: number[] = [];
    const rawAnalyses: FrameLightAnalysis[] = [];

    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const landmarks = detectLandmarksForVideoFrame(
        landmarker,
        video,
        performance.now(),
        messages.cameraNotReady
      );
      if (landmarks) {
        symmetryScores.push(computeSymmetryScore(landmarks));
        const crop = cropRegionToImageData(
          source,
          landmarks,
          [LANDMARK.forehead, LANDMARK.leftCheek, LANDMARK.rightCheek],
          0.3
        );
        rawAnalyses.push(analyzeFrameLighting(crop));

        const correctedCrop = gains ? applyWhiteBalance(crop, gains) : crop;
        brightnessSamples.push(computeBrightness(correctedCrop));
        undertoneSamples.push(classifyUndertone(correctedCrop));
        fitzpatrickSamples.push(computeFitzpatrickFromImageData(correctedCrop));
        textureScores.push(textureVarianceScore(correctedCrop));
      }
      if (i < SAMPLE_COUNT - 1) await sleep(SAMPLE_INTERVAL_MS);
    }

    const { lowConfidence } = assessCaptureQuality(
      symmetryScores.length,
      rawAnalyses,
      messages,
      forceAccept
    );

    const symmetryScore = Math.round(trimmedMean(symmetryScores));
    const brightness = average(brightnessSamples);
    const fitzpatrick = mostFrequent(fitzpatrickSamples);
    const undertone = mostFrequent(undertoneSamples);
    const personalColorSeason = classifyPersonalColorSeason(brightness, undertone);
    const textureScore = trimmedMean(textureScores);
    const compositeScore = Math.round((symmetryScore + textureScore) / 2);

    let estimatedAgeRange: string;
    try {
      const ageEstimate = await estimateAge(video, messages);
      estimatedAgeRange = ageEstimate
        ? ageEstimate.ageRangeLabel
        : estimateAgeRangeFallback(compositeScore, messages);
    } catch {
      estimatedAgeRange = estimateAgeRangeFallback(compositeScore, messages);
    }

    return {
      fitzpatrick,
      undertone,
      personalColorSeason,
      symmetryScore,
      estimatedAgeRange,
      lowConfidence,
    };
  }

  async scanZone(
    source: HTMLVideoElement | HTMLCanvasElement,
    focusMetric: SkinMetricKey,
    messages: AnalysisMessages,
    metricLabels: Record<SkinMetricKey, string>,
    gains?: WhiteBalanceGains,
    forceAccept: boolean = false
  ): Promise<DeepScanResult> {
    const video = requireVideo(source, messages);
    const landmarker = await getFaceLandmarker();
    const metricKeys = Object.keys(ZONE_REGIONS) as SkinMetricKey[];
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
        video,
        performance.now(),
        messages.cameraNotReady
      );
      if (landmarks) {
        sampledCount++;
        const qualityCrop = cropRegionToImageData(
          source,
          landmarks,
          [LANDMARK.leftCheek, LANDMARK.rightCheek, LANDMARK.forehead],
          0.3
        );
        rawAnalyses.push(analyzeFrameLighting(qualityCrop));

        for (const key of metricKeys) {
          const boxSizeRatio = key === focusMetric ? 0.22 : 0.14;

          if (key === "elasticity") {
            scoreSamples[key].push(computeElasticityScore(landmarks));
            continue;
          }

          const regionScores = ZONE_REGIONS[key].map((indices) => {
            let crop = cropRegionToImageData(
              source,
              landmarks,
              indices,
              boxSizeRatio
            );
            if (gains) crop = applyWhiteBalance(crop, gains);
            if (key === "pore") return textureVarianceScore(crop);
            if (key === "wrinkle") return edgeDensityScore(crop);
            return colorEvennessScore(crop);
          });
          scoreSamples[key].push(average(regionScores));
        }
      }
      if (i < SAMPLE_COUNT - 1) await sleep(SAMPLE_INTERVAL_MS);
    }

    const { lowConfidence } = assessCaptureQuality(
      sampledCount,
      rawAnalyses,
      messages,
      forceAccept
    );

    const metrics: SkinMetricScore[] = metricKeys.map((key) => ({
      key,
      label: metricLabels[key],
      score: Math.round(trimmedMean(scoreSamples[key])),
    }));

    const overallScore = Math.round(
      metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length
    );

    return { metrics, overallScore, lowConfidence };
  }
}

export const analysisEngine: AnalysisEngine = new MediaPipeAnalysisEngine();
