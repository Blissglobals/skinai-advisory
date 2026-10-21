import type { FitzpatrickType } from "./fitzpatrick";

export type SkinMetricKey = "pore" | "wrinkle" | "pigment" | "elasticity";

export interface SkinMetricScore {
  key: SkinMetricKey;
  label: string;
  score: number;
}

export type UndertoneKey = "warm" | "cool" | "neutral";

export type PersonalColorSeason =
  | "spring_warm"
  | "summer_cool"
  | "autumn_warm"
  | "winter_cool"
  | "neutral";

export interface FaceScanResult {
  fitzpatrick: FitzpatrickType;
  undertone: UndertoneKey;
  personalColorSeason: PersonalColorSeason;
  symmetryScore: number;
  estimatedAgeRange: string;
  lowConfidence: boolean;
}

export interface DeepScanResult {
  metrics: SkinMetricScore[];
  overallScore: number;
  lowConfidence: boolean;
}

export interface AnalysisMessages {
  cameraNotReady: string;
  faceNotDetected: string;
  tooDark: string;
  colorCastSevere: string;
  videoOnly: string;
  ageFallback: {
    early20s: string;
    late20sEarly30s: string;
    mid30s: string;
    forties: string;
    lateForties: string;
  };
  ageRangeUnderTen: string;
  ageRangeDecade: string;
}

export interface ScanOutcome {
  face: FaceScanResult;
  deep: DeepScanResult;
}

export interface AnalysisEngine {
  /** 한 번의 촬영 프레임으로 얼굴 정보(재미 요소)와 피부 지표를 함께 계산합니다. */
  scan(
    source: HTMLVideoElement | HTMLCanvasElement,
    messages: AnalysisMessages,
    metricLabels: Record<SkinMetricKey, string>,
    forceAccept?: boolean
  ): Promise<ScanOutcome>;
}
