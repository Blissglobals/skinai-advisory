import type { WhiteBalanceGains } from "@/lib/whiteBalance";
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

export interface AnalysisEngine {
  scanFace(
    source: HTMLVideoElement | HTMLCanvasElement,
    messages: AnalysisMessages,
    metricLabels: Record<SkinMetricKey, string>,
    gains?: WhiteBalanceGains,
    forceAccept?: boolean
  ): Promise<FaceScanResult>;
  scanZone(
    source: HTMLVideoElement | HTMLCanvasElement,
    focusMetric: SkinMetricKey,
    messages: AnalysisMessages,
    metricLabels: Record<SkinMetricKey, string>,
    gains?: WhiteBalanceGains,
    forceAccept?: boolean
  ): Promise<DeepScanResult>;
}
