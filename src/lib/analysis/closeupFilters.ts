import { boxBlur, luminance, mean } from "./pixelHeuristics";

// 확대 촬영 사진을 "특수 촬영처럼" 보여주는 시각화 필터입니다.
// UV·편광 같은 실제 특수 광원 촬영이 아니라, 일반 카메라 사진에서 특정 크기·색 성분만
// 대비를 키워 보여주는 것입니다. 점수 계산에는 쓰지 않습니다(점수는 전체 얼굴 정밀 촬영에서).
// 반경은 크롭 폭 대비 비율이라 촬영 해상도가 달라도 같은 느낌으로 나옵니다.

export type CloseupKind = "pigment" | "wrinkle" | "pore";

const clamp = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : v);

function channel(img: ImageData, offset: number): Float32Array {
  const out = new Float32Array(img.width * img.height);
  for (let i = 0; i < out.length; i++) out[i] = img.data[i * 4 + offset];
  return out;
}

function write(img: ImageData, pixel: (i: number) => [number, number, number]): ImageData {
  const out = new ImageData(img.width, img.height);
  for (let i = 0; i < img.width * img.height; i++) {
    const [r, g, b] = pixel(i);
    out.data[i * 4] = clamp(r);
    out.data[i * 4 + 1] = clamp(g);
    out.data[i * 4 + 2] = clamp(b);
    out.data[i * 4 + 3] = 255;
  }
  return out;
}

// 색소: 멜라닌은 파란빛을 많이 흡수해서 청색 채널에서 잡티가 가장 진하게 보입니다.
// 청색 채널의 국소 대비만 키워 푸른 회색 톤으로 보여줍니다.
function pigmentView(img: ImageData): ImageData {
  const { width, height } = img;
  const blue = channel(img, 2);
  const local = boxBlur(blue, width, height, Math.max(4, Math.round(width / 20)));
  const m = Math.max(mean(blue), 1);
  return write(img, (i) => {
    const v = 185 + ((blue[i] - local[i]) / m) * 255 * 3;
    return [v * 0.78, v * 0.9, v];
  });
}

// 주름: 중간 크기의 어두운 선만 남겨 민트색으로 덧칠합니다.
function wrinkleView(img: ImageData): ImageData {
  const { width, height } = img;
  const gray = luminance(img);
  const fine = boxBlur(gray, width, height, 1);
  const coarse = boxBlur(gray, width, height, Math.max(3, Math.round(width / 40)));
  const m = Math.max(mean(gray), 1);
  return write(img, (i) => {
    const s = clamp((-(fine[i] - coarse[i]) / m) * 255 * 5) / 255;
    const base = gray[i] * 0.42;
    return [base * (1 - s) + 143 * s, base * (1 - s) + 217 * s, base * (1 - s) + 188 * s];
  });
}

// 모공·피부결: 아주 작은 요철만 남겨 흑백 대비로 보여줍니다.
function poreView(img: ImageData): ImageData {
  const { width, height } = img;
  const gray = luminance(img);
  const blur = boxBlur(gray, width, height, Math.max(2, Math.round(width / 150)));
  const m = Math.max(mean(gray), 1);
  return write(img, (i) => {
    const v = 160 + ((gray[i] - blur[i]) / m) * 255 * 6;
    return [v, v * 0.97, v * 0.92];
  });
}

export const closeupFilter: Record<CloseupKind, (img: ImageData) => ImageData> = {
  pigment: pigmentView,
  wrinkle: wrinkleView,
  pore: poreView,
};

/** 선명도(초점): 라플라시안 표준편차, 평균 밝기 대비 %. 흔들리거나 초점이 안 맞으면 낮아집니다. */
export function sharpness(img: ImageData): number {
  const { width, height } = img;
  const g = luminance(img);
  let sum = 0;
  let sumSq = 0;
  let n = 0;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const lap = 4 * g[i] - g[i - 1] - g[i + 1] - g[i - width] - g[i + width];
      sum += lap;
      sumSq += lap * lap;
      n++;
    }
  }
  const avg = sum / Math.max(n, 1);
  return (Math.sqrt(Math.max(0, sumSq / Math.max(n, 1) - avg * avg)) / Math.max(mean(g), 1)) * 100;
}
