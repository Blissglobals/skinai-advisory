export type FitzpatrickType = "I" | "II" | "III" | "IV" | "V" | "VI";

function srgbToLinear(c: number): number {
  const v = c / 255;
  return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
}

function fLab(t: number): number {
  return t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
}

export function rgbToLab(
  r: number,
  g: number,
  b: number
): { l: number; a: number; b: number } {
  const rl = srgbToLinear(r);
  const gl = srgbToLinear(g);
  const bl = srgbToLinear(b);

  const x = rl * 0.4124 + gl * 0.3576 + bl * 0.1805;
  const y = rl * 0.2126 + gl * 0.7152 + bl * 0.0722;
  const z = rl * 0.0193 + gl * 0.1192 + bl * 0.9505;

  const xn = 0.95047;
  const yn = 1.0;
  const zn = 1.08883;

  const fx = fLab(x / xn);
  const fy = fLab(y / yn);
  const fz = fLab(z / zn);

  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

// ITA(Individual Typology Angle)는 피부 밝기를 정량화하는 피부과학 색상 지표입니다.
// (Chardon et al. 분류 기준 사용)
export function computeITA(l: number, bLab: number): number {
  return Math.atan2(l - 50, bLab) * (180 / Math.PI);
}

export function classifyFitzpatrick(ita: number): FitzpatrickType {
  if (ita > 55) return "I";
  if (ita > 41) return "II";
  if (ita > 28) return "III";
  if (ita > 19) return "IV";
  if (ita > 10) return "V";
  return "VI";
}

export function computeFitzpatrickFromImageData(
  imageData: ImageData
): FitzpatrickType {
  const { data } = imageData;
  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  const pixelCount = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    totalR += data[i];
    totalG += data[i + 1];
    totalB += data[i + 2];
  }
  const lab = rgbToLab(
    totalR / pixelCount,
    totalG / pixelCount,
    totalB / pixelCount
  );
  const ita = computeITA(lab.l, lab.b);
  return classifyFitzpatrick(ita);
}
