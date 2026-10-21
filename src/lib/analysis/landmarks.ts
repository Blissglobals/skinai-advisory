import {
  FaceLandmarker,
  FilesetResolver,
  type NormalizedLandmark,
} from "@mediapipe/tasks-vision";
import type { SkinMetricKey } from "./types";
import { sigmoidScore } from "./scoring";

const WASM_BASE =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

let landmarkerPromise: Promise<FaceLandmarker> | null = null;

// GPU 초기화가 실패하는 기기(일부 안드로이드·인앱 브라우저)는 CPU로 다시 시도합니다.
export function getFaceLandmarker(): Promise<FaceLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = FilesetResolver.forVisionTasks(WASM_BASE).then(async (fileset) => {
      const create = (delegate: "GPU" | "CPU") =>
        FaceLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate },
          runningMode: "VIDEO",
          numFaces: 1,
        });
      try {
        return await create("GPU");
      } catch {
        return create("CPU");
      }
    });
    landmarkerPromise.catch(() => {
      landmarkerPromise = null;
    });
  }
  return landmarkerPromise;
}

// MediaPipe Face Mesh 인덱스. left/right는 기존 코드 관례(화면 기준)를 따릅니다.
export const LANDMARK = {
  noseBridge: 168,
  noseTip: 1,
  chin: 152,
  forehead: 10,
  foreheadMid: 151,
  leftFaceEdge: 234,
  rightFaceEdge: 454,
  leftEyeOuter: 33,
  leftEyeInner: 133,
  rightEyeOuter: 263,
  rightEyeInner: 362,
  leftMouthCorner: 61,
  rightMouthCorner: 291,
  leftCheek: 50,
  rightCheek: 280,
  leftJaw: 172,
  rightJaw: 397,
  leftNasolabial: 205,
  rightNasolabial: 425,
};

export interface Point {
  x: number;
  y: number;
}

/** 얼굴 폭(픽셀). 분석 영역 크기를 화면이 아니라 얼굴에 맞추는 기준입니다. */
export function faceWidthPx(landmarks: NormalizedLandmark[], width: number, height: number): number {
  const a = landmarks[LANDMARK.leftFaceEdge];
  const b = landmarks[LANDMARK.rightFaceEdge];
  return Math.hypot((a.x - b.x) * width, (a.y - b.y) * height);
}

// 눈꼬리에서 바깥쪽(눈 안쪽→바깥쪽 방향)으로 이동한 지점 = 눈가 주름 위치.
// 눈꼬리 자체를 잡으면 속눈썹·눈 경계선이 주름 점수를 지배합니다.
function beyondEyeCorner(outer: NormalizedLandmark, inner: NormalizedLandmark, factor: number): Point {
  return { x: outer.x + (outer.x - inner.x) * factor, y: outer.y + (outer.y - inner.y) * factor };
}

/**
 * 지표별로 잘라 볼 피부 지점(정규화 좌표). 눈·눈썹·입·머리카락을 피해
 * 피부만 들어오는 위치를 고릅니다.
 * ponytail: 사각형 영역 + 피부 위치 선정으로 대신함. 정밀 분석에서 얼굴 메시
 * 다각형 마스크로 바꾸면 경계 근처 오염이 더 줄어듭니다.
 */
export function zoneCenters(landmarks: NormalizedLandmark[]): Record<SkinMetricKey, Point[]> {
  const L = landmarks;
  const leftCheek = L[LANDMARK.leftCheek];
  const rightCheek = L[LANDMARK.rightCheek];
  const forehead = L[LANDMARK.foreheadMid];
  return {
    pore: [leftCheek, rightCheek],
    wrinkle: [
      beyondEyeCorner(L[LANDMARK.leftEyeOuter], L[LANDMARK.leftEyeInner], 0.45),
      beyondEyeCorner(L[LANDMARK.rightEyeOuter], L[LANDMARK.rightEyeInner], 0.45),
      forehead,
      L[LANDMARK.leftNasolabial],
      L[LANDMARK.rightNasolabial],
    ],
    pigment: [leftCheek, rightCheek, forehead],
    elasticity: [],
  };
}

// 지표별 영역 크기(얼굴 폭 대비). 고민 선택과 무관하게 항상 같은 크기를 씁니다.
export const ZONE_SIZE: Record<SkinMetricKey, number> = {
  pore: 0.16,
  wrinkle: 0.1,
  pigment: 0.2,
  elasticity: 0,
};

/** 분석용 크롭은 항상 이 크기로 다시 그려서, 촬영 해상도·거리가 달라도 같은 척도로 잽니다. */
export const CROP_OUTPUT_PX = 128;

export function cropSquare(
  source: HTMLVideoElement | HTMLCanvasElement,
  center: Point,
  sizePx: number,
  outputPx: number = CROP_OUTPUT_PX
): ImageData {
  const sourceWidth = source instanceof HTMLVideoElement ? source.videoWidth : source.width;
  const sourceHeight = source instanceof HTMLVideoElement ? source.videoHeight : source.height;
  const size = Math.max(8, Math.min(Math.round(sizePx), sourceWidth, sourceHeight));
  const sx = Math.max(0, Math.min(sourceWidth - size, Math.round(center.x * sourceWidth - size / 2)));
  const sy = Math.max(0, Math.min(sourceHeight - size, Math.round(center.y * sourceHeight - size / 2)));

  const canvas = document.createElement("canvas");
  canvas.width = outputPx;
  canvas.height = outputPx;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, sx, sy, size, size, 0, 0, outputPx, outputPx);
  return ctx.getImageData(0, 0, outputPx, outputPx);
}

export function detectLandmarksForVideoFrame(
  landmarker: FaceLandmarker,
  source: HTMLVideoElement | HTMLCanvasElement,
  timestampMs: number,
  cameraNotReadyMessage: string
): NormalizedLandmark[] | null {
  const w = source instanceof HTMLVideoElement ? source.videoWidth : source.width;
  if (w === 0) throw new Error(cameraNotReadyMessage);
  const result = landmarker.detectForVideo(source, timestampMs);
  if (!result.faceLandmarks || result.faceLandmarks.length === 0) return null;
  return result.faceLandmarks[0];
}

export function tryDetectLandmarksForVideoFrame(
  landmarker: FaceLandmarker,
  video: HTMLVideoElement,
  timestampMs: number
): NormalizedLandmark[] | null {
  if (video.videoWidth === 0 || video.videoHeight === 0) return null;
  const result = landmarker.detectForVideo(video, timestampMs);
  if (!result.faceLandmarks || result.faceLandmarks.length === 0) return null;
  return result.faceLandmarks[0];
}

// 고개를 돌리거나 기울이면 좌우 볼의 조명·크기가 달라져 점수가 흔들립니다.
// 정면에 가까울 때만 자동 촬영되도록 허용 범위를 둡니다(보정 필요: 실측으로 조정).
const MAX_YAW_OFFSET = 0.12; // 코끝이 얼굴 가운데에서 벗어난 비율
const MAX_ROLL_DEG = 10;

export function headPose(landmarks: NormalizedLandmark[]): { yawOffset: number; rollDeg: number } {
  const left = landmarks[LANDMARK.leftFaceEdge];
  const right = landmarks[LANDMARK.rightFaceEdge];
  const nose = landmarks[LANDMARK.noseTip];
  const yawOffset = Math.abs((nose.x - left.x) / Math.max(right.x - left.x, 0.001) - 0.5);
  const eyeA = landmarks[LANDMARK.leftEyeOuter];
  const eyeB = landmarks[LANDMARK.rightEyeOuter];
  let rollDeg = Math.abs((Math.atan2(eyeB.y - eyeA.y, eyeB.x - eyeA.x) * 180) / Math.PI);
  if (rollDeg > 90) rollDeg = 180 - rollDeg;
  return { yawOffset, rollDeg };
}

export function computeFaceAlignment(landmarks: NormalizedLandmark[]): boolean {
  const left = landmarks[LANDMARK.leftFaceEdge];
  const right = landmarks[LANDMARK.rightFaceEdge];
  const top = landmarks[LANDMARK.forehead];
  const bottom = landmarks[LANDMARK.chin];

  const centerX = (left.x + right.x) / 2;
  const centerY = (top.y + bottom.y) / 2;
  const faceWidth = Math.abs(right.x - left.x);

  const centeredX = Math.abs(centerX - 0.5) < 0.15;
  const centeredY = Math.abs(centerY - 0.5) < 0.18;
  const sizeOk = faceWidth > 0.28 && faceWidth < 0.78;
  const { yawOffset, rollDeg } = headPose(landmarks);

  return centeredX && centeredY && sizeOk && yawOffset < MAX_YAW_OFFSET && rollDeg < MAX_ROLL_DEG;
}

export function computeSymmetryScore(landmarks: NormalizedLandmark[]): number {
  const axisX = (landmarks[LANDMARK.noseBridge].x + landmarks[LANDMARK.chin].x) / 2;
  const pairs: [number, number][] = [
    [LANDMARK.leftEyeOuter, LANDMARK.rightEyeOuter],
    [LANDMARK.leftMouthCorner, LANDMARK.rightMouthCorner],
    [LANDMARK.leftFaceEdge, LANDMARK.rightFaceEdge],
  ];
  const deviations = pairs.map(([leftIdx, rightIdx]) => {
    const leftDist = Math.abs(landmarks[leftIdx].x - axisX);
    const rightDist = Math.abs(landmarks[rightIdx].x - axisX);
    return Math.abs(leftDist - rightDist) / Math.max(leftDist, rightDist, 0.001);
  });
  const avgDeviation = deviations.reduce((sum, v) => sum + v, 0) / deviations.length;
  return sigmoidScore(avgDeviation, 0.5, 0.15);
}

// 주의: 턱 랜드마크 높이 비율이라 실제로는 탄력보다 얼굴형·고개 각도를 반영합니다.
// 2-2 단계(1차 결과 범위 확정)에서 기본 결과에서 빼고 정밀 분석에서 재설계합니다.
export function computeElasticityScore(landmarks: NormalizedLandmark[]): number {
  const faceHeight = Math.abs(landmarks[LANDMARK.forehead].y - landmarks[LANDMARK.chin].y);
  const jawDrop =
    (landmarks[LANDMARK.leftJaw].y + landmarks[LANDMARK.rightJaw].y) / 2 -
    landmarks[LANDMARK.chin].y;
  const sagRatio = Math.abs(jawDrop) / Math.max(faceHeight, 0.001);
  return sigmoidScore(sagRatio, 0.385, 0.1);
}
