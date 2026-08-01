export interface WhiteBalanceGains {
  r: number;
  g: number;
  b: number;
}

export interface FrameLightAnalysis {
  brightness: number;
  gains: WhiteBalanceGains;
  isBrightEnough: boolean;
  isColorBalanced: boolean;
}

const MIN_BRIGHTNESS = 60;
const MAX_GAIN_DEVIATION = 0.25;
const GAIN_MIN = 0.6;
const GAIN_MAX = 1.8;

export const NEUTRAL_GAINS: WhiteBalanceGains = { r: 1, g: 1, b: 1 };

export function analyzeFrameLighting(imageData: ImageData): FrameLightAnalysis {
  const { data } = imageData;
  const pixelCount = data.length / 4;
  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  for (let i = 0; i < data.length; i += 4) {
    totalR += data[i];
    totalG += data[i + 1];
    totalB += data[i + 2];
  }
  const avgR = totalR / pixelCount;
  const avgG = totalG / pixelCount;
  const avgB = totalB / pixelCount;
  const brightness = (avgR + avgG + avgB) / 3;

  const target = brightness || 1;
  const clamp = (v: number) => Math.max(GAIN_MIN, Math.min(GAIN_MAX, v));
  const gains: WhiteBalanceGains = {
    r: clamp(target / Math.max(avgR, 1)),
    g: clamp(target / Math.max(avgG, 1)),
    b: clamp(target / Math.max(avgB, 1)),
  };

  const isColorBalanced =
    Math.abs(gains.r - 1) < MAX_GAIN_DEVIATION &&
    Math.abs(gains.g - 1) < MAX_GAIN_DEVIATION &&
    Math.abs(gains.b - 1) < MAX_GAIN_DEVIATION;

  return {
    brightness,
    gains,
    isBrightEnough: brightness >= MIN_BRIGHTNESS,
    isColorBalanced,
  };
}

const CAST_HINT_THRESHOLD = 0.12;

export type LightingStatus = "dark" | "yellowCast" | "blueCast" | "good";

export interface LightingMessages {
  dark: string;
  yellowCast: string;
  blueCast: string;
  good: string;
}

// 번역 문자열과 비교하지 않고 판정 자체를 코드로 분리해두면, 조명이
// "적절함" 상태인지 UI 문구와 무관하게 안정적으로 확인할 수 있습니다
// (자동 촬영 전환 조건 판단에 사용).
export function getLightingStatus(analysis: FrameLightAnalysis): LightingStatus {
  if (!analysis.isBrightEnough) return "dark";
  const { r, b } = analysis.gains;
  if (b - r > CAST_HINT_THRESHOLD) return "yellowCast";
  if (r - b > CAST_HINT_THRESHOLD) return "blueCast";
  return "good";
}

export function describeLighting(
  analysis: FrameLightAnalysis,
  messages: LightingMessages
): string {
  return messages[getLightingStatus(analysis)];
}

export const HARD_MIN_BRIGHTNESS = 45;
export const SOFT_MIN_BRIGHTNESS = MIN_BRIGHTNESS;
export const HARD_CAST_DEVIATION = 0.35;

export function maxGainDeviation(gains: WhiteBalanceGains): number {
  return Math.max(
    Math.abs(gains.r - 1),
    Math.abs(gains.g - 1),
    Math.abs(gains.b - 1)
  );
}

export function applyWhiteBalance(
  imageData: ImageData,
  gains: WhiteBalanceGains
): ImageData {
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * gains.r);
    data[i + 1] = Math.min(255, data[i + 1] * gains.g);
    data[i + 2] = Math.min(255, data[i + 2] * gains.b);
  }
  return imageData;
}
