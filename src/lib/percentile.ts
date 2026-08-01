// 실제 사용자 데이터베이스가 쌓이기 전까지 사용하는 재미용 추정치입니다.
// 나중에 실제 집계 통계가 생기면 이 함수의 내부 구현만 교체하면 됩니다
// (호출부는 estimateAgePercentile(score, age) 시그니처를 그대로 사용할 수 있도록 설계).

function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * absX);
  const y =
    1 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return sign * y;
}

function normalCdf(x: number, mean: number, stdDev: number): number {
  return 0.5 * (1 + erf((x - mean) / (stdDev * Math.SQRT2)));
}

const BASE_MEAN = 78;
const MEAN_AGE_SLOPE = -0.25;
const STD_DEV = 11;

/**
 * score는 0-100 내부 스케일 기준. 실제 사용자 통계가 아닌
 * 정규분포를 가정한 시뮬레이션 값이며, 나이가 많을수록 평균 기준선이
 * 완만하게 낮아지도록 구성되어 있습니다.
 */
export function estimateAgePercentile(score: number, age: number): number {
  const clampedAge = Math.max(15, Math.min(70, age));
  const mean = BASE_MEAN + (clampedAge - 25) * MEAN_AGE_SLOPE;
  const cdf = normalCdf(score, mean, STD_DEV);
  const topPercent = Math.round((1 - cdf) * 100);
  return Math.max(1, Math.min(99, topPercent));
}
