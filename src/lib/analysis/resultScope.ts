import type { SkinMetricKey } from "./types";

// 1차(기본 1장 촬영) 결과에 점수로 보여주는 지표. 종합 점수도 이것들로만 계산합니다.
export const BASE_METRICS: SkinMetricKey[] = ["pigment", "wrinkle"];

// 일반 셀카 해상도로는 믿기 어려워 1차 결과에서는 잠가 두고 정밀 분석에서 보여주는 지표.
export const PRECISION_METRICS: SkinMetricKey[] = ["pore"];

// "탄력"은 사진 1장 랜드마크로는 얼굴형·고개 각도를 재게 되어 1차 결과에서 뺐습니다.
// 정밀 분석(측면/다각도 촬영)에서 다시 설계합니다.
