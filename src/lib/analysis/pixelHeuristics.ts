import { sigmoidScore } from "./scoring";

// 모든 지표는 CROP_OUTPUT_PX(128) 크기로 다시 그린 피부 크롭을 받습니다.
// 값은 "평균 밝기 대비 %"로 정규화해서, 노출(밝기)이 달라도 같은 피부면 비슷하게 나오게 합니다.
// 필터 반경은 크롭 크기에 대한 고정 픽셀이라 얼굴 크기와 무관합니다.

function luminance(imageData: ImageData): Float32Array {
  const { data, width, height } = imageData;
  const out = new Float32Array(width * height);
  for (let i = 0; i < out.length; i++) {
    out[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
  }
  return out;
}

// 가로→세로 순서의 박스 블러(누적합). 가장자리는 가장 가까운 값으로 채웁니다.
function boxBlur(src: Float32Array, width: number, height: number, radius: number): Float32Array {
  if (radius <= 0) return src.slice();
  const tmp = new Float32Array(src.length);
  const out = new Float32Array(src.length);
  const span = radius * 2 + 1;
  for (let y = 0; y < height; y++) {
    let acc = 0;
    for (let k = -radius; k <= radius; k++) acc += src[y * width + Math.min(width - 1, Math.max(0, k))];
    for (let x = 0; x < width; x++) {
      tmp[y * width + x] = acc / span;
      const add = Math.min(width - 1, x + radius + 1);
      const sub = Math.max(0, x - radius);
      acc += src[y * width + add] - src[y * width + sub];
    }
  }
  for (let x = 0; x < width; x++) {
    let acc = 0;
    for (let k = -radius; k <= radius; k++) acc += tmp[Math.min(height - 1, Math.max(0, k)) * width + x];
    for (let y = 0; y < height; y++) {
      out[y * width + x] = acc / span;
      const add = Math.min(height - 1, y + radius + 1);
      const sub = Math.max(0, y - radius);
      acc += tmp[add * width + x] - tmp[sub * width + x];
    }
  }
  return out;
}

function mean(values: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < values.length; i++) sum += values[i];
  return sum / values.length;
}

function stdOfDifference(a: Float32Array, b: Float32Array): number {
  let sum = 0;
  let sumSq = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i];
    sum += d;
    sumSq += d * d;
  }
  const m = sum / a.length;
  return Math.sqrt(Math.max(0, sumSq / a.length - m * m));
}

/** 미세 결(모공·거친 결) 세기: 아주 작은 디테일만 남긴 성분의 표준편차, 평균 밝기 대비 %. */
export function poreTextureValue(imageData: ImageData): number {
  const { width, height } = imageData;
  const gray = luminance(imageData);
  return (stdOfDifference(gray, boxBlur(gray, width, height, 2)) / Math.max(mean(gray), 1)) * 100;
}

/** 선(주름) 세기: 미세 노이즈와 큰 조명 변화를 뺀 중간 대역의 기울기 평균, 평균 밝기 대비 %. */
export function wrinkleLineValue(imageData: ImageData): number {
  const { width, height } = imageData;
  const gray = luminance(imageData);
  const fine = boxBlur(gray, width, height, 1);
  const coarse = boxBlur(gray, width, height, 6);
  const band = new Float32Array(gray.length);
  for (let i = 0; i < band.length; i++) band[i] = fine[i] - coarse[i];
  let edgeSum = 0;
  let count = 0;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      edgeSum += Math.hypot(band[i + 1] - band[i - 1], band[i + width] - band[i - width]);
      count++;
    }
  }
  return (edgeSum / Math.max(count, 1) / Math.max(mean(gray), 1)) * 100;
}

/** 톤 고르기(색소·얼룩): 모공 크기보다 크고 조명 그라데이션보다 작은 얼룩 성분, 평균 밝기 대비 %. */
export function toneUnevennessValue(imageData: ImageData): number {
  const { width, height } = imageData;
  const gray = luminance(imageData);
  return (
    (stdOfDifference(boxBlur(gray, width, height, 3), boxBlur(gray, width, height, 24)) /
      Math.max(mean(gray), 1)) *
    100
  );
}

// 점수 곡선 기준값(값이 이 정도면 시그모이드 중간). AI 인물 사진 기준으로 잡은 임시값이라
// 실제 촬영 데이터가 쌓이면 다시 맞춰야 합니다. — /preview/engine 페이지로 확인.
export const SCORE_CURVE = {
  pore: { midpoint: 3.0, steepness: 1.0 },
  wrinkle: { midpoint: 2.2, steepness: 0.7 },
  pigment: { midpoint: 2.4, steepness: 0.8 },
};

export const poreScore = (img: ImageData) =>
  sigmoidScore(poreTextureValue(img), SCORE_CURVE.pore.midpoint, SCORE_CURVE.pore.steepness);
export const wrinkleScore = (img: ImageData) =>
  sigmoidScore(wrinkleLineValue(img), SCORE_CURVE.wrinkle.midpoint, SCORE_CURVE.wrinkle.steepness);
export const pigmentScore = (img: ImageData) =>
  sigmoidScore(toneUnevennessValue(img), SCORE_CURVE.pigment.midpoint, SCORE_CURVE.pigment.steepness);
