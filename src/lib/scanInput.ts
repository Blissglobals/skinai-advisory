import type { DeepScanResult, SkinMetricKey, SkinMetricScore } from "./analysis/types";

const METRIC_KEYS: SkinMetricKey[] = ["pore", "wrinkle", "pigment", "elasticity"];

function isScore(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100;
}

// 클라이언트가 보낸 스캔 결과는 그대로 LLM 프롬프트와 PDF에 들어가므로,
// 숫자 범위만 받아들이고 라벨 같은 문자열은 서버 사전 값으로 다시 채웁니다.
export function parseDeepScan(
  raw: unknown,
  labels: Record<SkinMetricKey, string>
): DeepScanResult | null {
  if (!raw || typeof raw !== "object") return null;
  const { metrics, overallScore, lowConfidence } = raw as Record<string, unknown>;
  if (!Array.isArray(metrics) || !isScore(overallScore) || typeof lowConfidence !== "boolean") {
    return null;
  }

  const parsed: SkinMetricScore[] = [];
  for (const key of METRIC_KEYS) {
    const metric = metrics.find((m) => m && typeof m === "object" && m.key === key);
    if (!metric || !isScore(metric.score)) return null;
    parsed.push({ key, label: labels[key], score: Math.round(metric.score) });
  }

  return { metrics: parsed, overallScore: Math.round(overallScore), lowConfidence };
}

export function parseAge(raw: unknown): number | null | undefined {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === "number" && Number.isInteger(raw) && raw >= 0 && raw <= 120) return raw;
  return undefined;
}
