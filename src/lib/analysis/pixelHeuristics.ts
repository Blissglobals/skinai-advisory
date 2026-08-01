import { sigmoidScore } from "./scoring";

function toGrayscale(imageData: ImageData): Float32Array {
  const { data, width, height } = imageData;
  const gray = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    gray[i] = 0.299 * r + 0.587 * g + 0.114 * b;
  }
  return gray;
}

export function textureVarianceScore(imageData: ImageData): number {
  const gray = toGrayscale(imageData);
  const mean = gray.reduce((sum, v) => sum + v, 0) / gray.length;
  const variance =
    gray.reduce((sum, v) => sum + (v - mean) ** 2, 0) / gray.length;
  return sigmoidScore(variance, 600, 150);
}

export function edgeDensityScore(imageData: ImageData): number {
  const { width, height } = imageData;
  const gray = toGrayscale(imageData);
  let edgeSum = 0;
  let count = 0;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const gx = gray[idx + 1] - gray[idx - 1];
      const gy = gray[idx + width] - gray[idx - width];
      edgeSum += Math.sqrt(gx * gx + gy * gy);
      count++;
    }
  }
  const avgEdge = count > 0 ? edgeSum / count : 0;
  return sigmoidScore(avgEdge, 33, 10);
}

export function colorEvennessScore(imageData: ImageData): number {
  const { data, width, height } = imageData;
  const diffs = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    diffs[i] = data[i * 4] - data[i * 4 + 1];
  }
  const mean = diffs.reduce((sum, v) => sum + v, 0) / diffs.length;
  const variance =
    diffs.reduce((sum, v) => sum + (v - mean) ** 2, 0) / diffs.length;
  return sigmoidScore(Math.sqrt(variance), 12.5, 4);
}
