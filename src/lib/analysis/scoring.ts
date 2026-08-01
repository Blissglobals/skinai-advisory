// 실제 인구 통계가 아니라 "최악의 경우에도 점수가 너무 가혹하게 낮게
// 나오지 않도록" 의도적으로 설계한 하한선입니다. 이 값 기준으로
// 평균적인 경우(시그모이드 중간값)는 자동으로 65점 근처로 이동하고,
// 표준편차도 비례해서 압축됩니다.
const SCORE_FLOOR = 30;

export function applyFriendlyFloor(rawScore: number): number {
  return SCORE_FLOOR + (rawScore * (100 - SCORE_FLOOR)) / 100;
}

// 극단적인 측정값이 들어와도 점수가 딱 0/100에 붙지 않고
// 완만하게 수렴하도록 시그모이드 곡선을 사용합니다.
export function sigmoidScore(
  penalty: number,
  midpoint: number,
  steepness: number
): number {
  const x = (penalty - midpoint) / steepness;
  const raw = 100 / (1 + Math.exp(x));
  return Math.round(applyFriendlyFloor(raw));
}

// 5개 샘플 중 최솟값/최댓값(이상치일 가능성이 높은 값)을 제외하고
// 평균을 내어, 프레임 1개가 튀어도 전체 점수가 흔들리지 않게 합니다.
export function trimmedMean(values: number[]): number {
  if (values.length <= 2) {
    return values.reduce((sum, v) => sum + v, 0) / values.length;
  }
  const sorted = [...values].sort((a, b) => a - b);
  const trimmed = sorted.slice(1, -1);
  return trimmed.reduce((sum, v) => sum + v, 0) / trimmed.length;
}
