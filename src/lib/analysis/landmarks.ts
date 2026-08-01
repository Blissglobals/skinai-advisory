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

export function getFaceLandmarker(): Promise<FaceLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = FilesetResolver.forVisionTasks(WASM_BASE).then(
      (fileset) =>
        FaceLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
          runningMode: "VIDEO",
          numFaces: 1,
        })
    );
  }
  return landmarkerPromise;
}

export const LANDMARK = {
  noseBridge: 168,
  noseTip: 1,
  chin: 152,
  forehead: 10,
  leftFaceEdge: 234,
  rightFaceEdge: 454,
  leftEyeOuter: 33,
  rightEyeOuter: 263,
  leftMouthCorner: 61,
  rightMouthCorner: 291,
  leftCheek: 50,
  rightCheek: 280,
  leftJaw: 172,
  rightJaw: 397,
  leftNasolabial: 205,
  rightNasolabial: 425,
};

// 각 지표마다 "따로 크롭할 하위 부위" 목록입니다. 좌우 랜드마크를 하나로 합쳐
// 중심점을 잡으면 얼굴 중앙(코 주변)으로 쏠려버려서, 부위별로 별도 크롭 후
// 점수를 평균 내는 방식으로 구성했습니다.
export const ZONE_REGIONS: Record<SkinMetricKey, number[][]> = {
  pore: [[LANDMARK.leftCheek], [LANDMARK.rightCheek]],
  wrinkle: [
    [LANDMARK.leftEyeOuter],
    [LANDMARK.rightEyeOuter],
    [LANDMARK.forehead],
    [LANDMARK.leftNasolabial],
    [LANDMARK.rightNasolabial],
  ],
  pigment: [[LANDMARK.leftCheek], [LANDMARK.rightCheek], [LANDMARK.forehead]],
  elasticity: [[LANDMARK.leftJaw, LANDMARK.rightJaw, LANDMARK.chin]],
};

export function detectLandmarksForVideoFrame(
  landmarker: FaceLandmarker,
  video: HTMLVideoElement,
  timestampMs: number,
  cameraNotReadyMessage: string
): NormalizedLandmark[] | null {
  if (video.videoWidth === 0 || video.videoHeight === 0) {
    throw new Error(cameraNotReadyMessage);
  }
  const result = landmarker.detectForVideo(video, timestampMs);
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

  return centeredX && centeredY && sizeOk;
}

export function computeSymmetryScore(landmarks: NormalizedLandmark[]): number {
  const axisX =
    (landmarks[LANDMARK.noseBridge].x + landmarks[LANDMARK.chin].x) / 2;
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
  const avgDeviation =
    deviations.reduce((sum, v) => sum + v, 0) / deviations.length;
  return sigmoidScore(avgDeviation, 0.5, 0.15);
}

export function computeElasticityScore(landmarks: NormalizedLandmark[]): number {
  const faceHeight = Math.abs(
    landmarks[LANDMARK.forehead].y - landmarks[LANDMARK.chin].y
  );
  const jawDrop =
    (landmarks[LANDMARK.leftJaw].y + landmarks[LANDMARK.rightJaw].y) / 2 -
    landmarks[LANDMARK.chin].y;
  const sagRatio = Math.abs(jawDrop) / Math.max(faceHeight, 0.001);
  return sigmoidScore(sagRatio, 0.385, 0.1);
}

export function cropRegionToImageData(
  source: HTMLVideoElement | HTMLCanvasElement,
  landmarks: NormalizedLandmark[],
  indices: number[],
  boxSizeRatio: number = 0.16
): ImageData {
  const sourceWidth =
    source instanceof HTMLVideoElement ? source.videoWidth : source.width;
  const sourceHeight =
    source instanceof HTMLVideoElement ? source.videoHeight : source.height;

  const centerX =
    indices.reduce((sum, i) => sum + landmarks[i].x, 0) / indices.length;
  const centerY =
    indices.reduce((sum, i) => sum + landmarks[i].y, 0) / indices.length;

  const boxSize = Math.round(sourceWidth * boxSizeRatio);
  const px = Math.round(centerX * sourceWidth - boxSize / 2);
  const py = Math.round(centerY * sourceHeight - boxSize / 2);
  const clampedX = Math.max(0, Math.min(sourceWidth - boxSize, px));
  const clampedY = Math.max(0, Math.min(sourceHeight - boxSize, py));

  const canvas = document.createElement("canvas");
  canvas.width = boxSize;
  canvas.height = boxSize;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    source,
    clampedX,
    clampedY,
    boxSize,
    boxSize,
    0,
    0,
    boxSize,
    boxSize
  );
  return ctx.getImageData(0, 0, boxSize, boxSize);
}
