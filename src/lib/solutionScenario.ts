import type { SkinMetricKey, SkinMetricScore } from "@/lib/analysis/types";

export type ScoreTier = "low" | "midLow" | "midHigh" | "high";

export function tierOf(score: number): ScoreTier {
  if (score < 40) return "low";
  if (score < 60) return "midLow";
  if (score < 80) return "midHigh";
  return "high";
}

export interface ScenarioDictionary {
  tierText: Record<SkinMetricKey, Record<ScoreTier, string>>;
  overallPattern: Record<number, string>;
  interactionText: string;
}

export interface SolutionScenario {
  overallText: string;
  metricTexts: Record<SkinMetricKey, string>;
  interactionText: string;
}

export function buildSolutionScenario(
  metrics: SkinMetricScore[],
  dict: ScenarioDictionary,
  metricLabels: Record<SkinMetricKey, string>
): SolutionScenario {
  const needsAttentionCount = metrics.filter((m) => {
    const tier = tierOf(m.score);
    return tier === "low" || tier === "midLow";
  }).length;

  const sorted = [...metrics].sort((a, b) => a.score - b.score);
  const worst = sorted[0];
  const best = sorted[sorted.length - 1];

  const metricTexts = Object.fromEntries(
    metrics.map((m) => [m.key, dict.tierText[m.key][tierOf(m.score)]])
  ) as Record<SkinMetricKey, string>;

  const interactionText =
    worst.key === best.key
      ? ""
      : dict.interactionText
          .replace("{worst}", metricLabels[worst.key])
          .replace("{best}", metricLabels[best.key]);

  return {
    overallText: dict.overallPattern[needsAttentionCount],
    metricTexts,
    interactionText,
  };
}
