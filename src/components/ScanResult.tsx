"use client";

import type { CSSProperties } from "react";
import CountUp from "@/components/CountUp";
import PromoBanner from "@/components/PromoBanner";
import { lineConsultUrl } from "@/lib/line/consult";
import type { DeepScanResult, FaceScanResult, SkinMetricKey } from "@/lib/analysis/types";
import { BASE_METRICS, PRECISION_METRICS } from "@/lib/analysis/resultScope";
import { formatScoreOutOf10 } from "@/lib/format";
import { estimateAgePercentile } from "@/lib/percentile";
import { buildSolutionScenario } from "@/lib/solutionScenario";
import type { Dictionary } from "@/i18n/getDictionary";

interface ScanResultProps {
  dict: Dictionary;
  deepScan: DeepScanResult;
  faceScan?: FaceScanResult | null;
  lowConfidence: boolean;
  userAge: number | null;
  focusMetric?: SkinMetricKey | null;
  minAgeForConsult: number;
}

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

// 연출 순서(ms): 헤더 → 종합 점수 링 → 지표 타일 순차 → 강점/약점 배지.
// 첫 화면 밖의 카드들은 스크롤해서 보일 때 올라오도록 CSS(motion-scroll)에 맡깁니다.
const RING_DELAY = 150;
const TILE_DELAY = 550;
const TILE_STAGGER = 110;
const BADGE_DELAY = 1500;

const formatInteger = (value: number) => String(Math.round(value));

function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

function buildConsultUrl(
  dict: Dictionary,
  deepScan: DeepScanResult,
  focusMetric: SkinMetricKey | null | undefined
): string {
  const m = dict.consult.message;
  const lines = [m.title];
  if (focusMetric) lines.push(`${m.concern}: ${dict.metrics[focusMetric].label}`);
  lines.push(`${m.overall}: ${formatScoreOutOf10(deepScan.overallScore)} ${m.outOf}`);
  lines.push(
    deepScan.metrics
      .filter((metric) => BASE_METRICS.includes(metric.key))
      .map((metric) => `${dict.metrics[metric.key].label} ${formatScoreOutOf10(metric.score)}`)
      .join(" · ")
  );
  return lineConsultUrl(lines);
}

export default function ScanResult({
  dict,
  deepScan,
  faceScan,
  lowConfidence,
  userAge,
  focusMetric,
  minAgeForConsult,
}: ScanResultProps) {
  const metricLabels: Record<SkinMetricKey, string> = {
    pore: dict.metrics.pore.label,
    wrinkle: dict.metrics.wrinkle.label,
    pigment: dict.metrics.pigment.label,
    elasticity: dict.metrics.elasticity.label,
  };
  // 1차 결과는 BASE_METRICS만 점수로 보여주고, PRECISION_METRICS는 잠금 타일로 보여줍니다.
  const baseMetrics = deepScan.metrics.filter((m) => BASE_METRICS.includes(m.key));
  const sortedMetrics = [...baseMetrics].sort((a, b) => a.score - b.score);
  const scenario = buildSolutionScenario(baseMetrics, dict.scenario, metricLabels);
  const s4 = dict.scan.step4;
  const worstKey = sortedMetrics.length > 1 ? sortedMetrics[0].key : null;
  const bestKey = sortedMetrics.length > 1 ? sortedMetrics[sortedMetrics.length - 1].key : null;
  const canConsult = userAge === null || userAge >= minAgeForConsult;
  const consultUrl = buildConsultUrl(dict, deepScan, focusMetric);

  return (
    <section className="flex flex-col gap-6">
      <div className="motion-rise" style={delay(0)}>
        <p className="text-xs font-medium tracking-wide text-brand-accent">
          {dict.scan.step4.badge}
        </p>
        <p className="mt-1 text-xs text-foreground/50">{dict.scan.step4.previewNotice}</p>
      </div>

      <div className="motion-rise flex flex-col items-center gap-2 py-2" style={delay(RING_DELAY)}>
        <div className="relative size-48">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
            <circle
              cx="60"
              cy="60"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="8"
              className="stroke-brand-border"
            />
            <circle
              cx="60"
              cy="60"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className="motion-ring stroke-brand-accent"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE * (1 - deepScan.overallScore / 100)}
              style={
                {
                  "--ring-c": RING_CIRCUMFERENCE,
                  "--d": `${RING_DELAY}ms`,
                } as CSSProperties
              }
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-5xl font-semibold">
              <CountUp
                value={deepScan.overallScore}
                format={formatScoreOutOf10}
                delayMs={RING_DELAY}
                durationMs={1200}
              />
            </span>
            <span className="text-xs text-foreground/50">{dict.scan.step4.outOf10}</span>
          </div>
        </div>
        <h1 className="font-display text-xl font-semibold">
          {dict.scan.step4.headingPrefix}
          {formatScoreOutOf10(deepScan.overallScore)}
          {dict.scan.step4.headingSuffix}
        </h1>
      </div>

      {lowConfidence && (
        <p
          className="motion-rise rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200"
          style={delay(RING_DELAY + 100)}
        >
          {dict.scan.step4.lowConfidence}
        </p>
      )}

      {userAge !== null && (
        <div
          className="motion-rise rounded-3xl bg-brand-secondary p-5"
          style={delay(RING_DELAY + 200)}
        >
          <p className="font-display text-lg font-semibold">
            {userAge}
            {dict.scan.step4.percentilePrefix}
            <CountUp
              value={estimateAgePercentile(deepScan.overallScore, userAge)}
              format={formatInteger}
              delayMs={RING_DELAY + 200}
            />
            {dict.scan.step4.percentileSuffix}
          </p>
          <p className="mt-1 text-xs text-foreground/50">
            {dict.scan.step4.percentileDisclaimer}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {baseMetrics.map((m, i) => {
          const tileDelay = TILE_DELAY + i * TILE_STAGGER;
          return (
            <div
              key={m.key}
              className="motion-rise rounded-3xl bg-brand-surface p-4 shadow-tinted"
              style={delay(tileDelay)}
            >
              <p className="text-xs text-foreground/55">{m.label}</p>
              <p className="font-display mt-1 text-2xl font-semibold">
                <CountUp value={m.score} format={formatScoreOutOf10} delayMs={tileDelay} />
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-border">
                <div
                  className="motion-bar h-full rounded-full bg-brand-accent"
                  style={{ width: `${m.score}%`, ...delay(tileDelay + 100) }}
                />
              </div>
            </div>
          );
        })}
        {PRECISION_METRICS.map((key) => (
          <div
            key={key}
            className={`motion-rise col-span-2 flex items-center gap-4 rounded-3xl border border-dashed p-4 ${
              focusMetric === key ? "border-brand-accent bg-brand-secondary" : "border-brand-border"
            }`}
            style={delay(TILE_DELAY + baseMetrics.length * TILE_STAGGER)}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground/[.06] text-lg" aria-hidden>
              🔒
            </span>
            <div>
              <p className="text-sm font-semibold">
                {metricLabels[key]} · {s4.lockedLabel}
              </p>
              <p className="mt-0.5 text-xs text-foreground/55">
                {focusMetric === key ? s4.lockedFocus : s4.lockedHint}
              </p>
            </div>
          </div>
        ))}
      </div>

      {canConsult ? (
        <div className="motion-scroll flex flex-col gap-2">
          <a
            href={consultUrl}
            className="shadow-tinted flex min-h-14 w-full items-center justify-center rounded-2xl bg-brand-accent px-4 text-[15px] font-semibold text-brand-accent-fg active:scale-[0.98]"
          >
            {dict.consult.cta}
          </a>
          <p className="text-center text-xs text-foreground/50">{dict.consult.note}</p>
        </div>
      ) : (
        <p className="text-center text-xs text-foreground/40">{dict.consult.ageRestricted}</p>
      )}

      {faceScan && (
        <section className="motion-scroll flex flex-col gap-3">
          <div>
            <p className="font-display text-lg font-semibold">{s4.funTitle}</p>
            <p className="mt-0.5 text-xs text-foreground/50">{s4.funNote}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-brand-surface p-4 shadow-tinted">
              <p className="text-xs text-foreground/55">{dict.scan.step2.ageRangeLabel}</p>
              <p className="font-display mt-1 text-lg font-semibold">{faceScan.estimatedAgeRange}</p>
            </div>
            <div className="rounded-3xl bg-brand-surface p-4 shadow-tinted">
              <p className="text-xs text-foreground/55">{dict.scan.step2.symmetryLabel}</p>
              <p className="font-display mt-1 text-lg font-semibold">
                {formatScoreOutOf10(faceScan.symmetryScore)}
                <span className="ml-0.5 text-sm font-normal text-foreground/50">{dict.scan.step2.point}</span>
              </p>
            </div>
            <div className="col-span-2 overflow-hidden rounded-3xl bg-brand-surface shadow-tinted">
              <div className="flex h-3">
                {dict.personalColor[faceScan.personalColorSeason].palette.map((color) => (
                  <span key={color} className="flex-1" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <p className="text-xs text-foreground/55">{dict.scan.step2.personalColorLabel}</p>
                  <p className="font-display mt-1 text-base font-semibold">
                    {dict.personalColor[faceScan.personalColorSeason].label}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-foreground/55">{dict.scan.step2.toneLabel}</p>
                  <p className="font-display mt-1 text-base font-semibold">
                    {dict.fitzpatrick[faceScan.fitzpatrick].label} · {dict.undertone[faceScan.undertone].label}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="motion-scroll rounded-3xl bg-brand-secondary p-5">
        <p className="font-display text-lg leading-snug font-semibold">{scenario.overallText}</p>
        {scenario.interactionText && (
          <p className="mt-2 text-sm text-foreground/65">{scenario.interactionText}</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {sortedMetrics.map((m) => (
          <div key={m.key} className="motion-scroll rounded-3xl bg-brand-surface p-5 shadow-tinted">
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-semibold">
                {m.label} · {formatScoreOutOf10(m.score)}
                {dict.scan.step2.point}
              </p>
              {m.key === worstKey && (
                <span
                  className="motion-pop rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800"
                  style={delay(BADGE_DELAY)}
                >
                  {dict.scan.step4.worstBadge}
                </span>
              )}
              {m.key === bestKey && (
                <span
                  className="motion-pop rounded-full bg-brand-secondary px-2 py-0.5 text-xs font-medium text-brand-secondary-fg"
                  style={delay(BADGE_DELAY + 120)}
                >
                  {dict.scan.step4.bestBadge}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-xs text-foreground/50">{dict.metrics[m.key].description}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75">{scenario.metricTexts[m.key]}</p>
            <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-foreground/[.035] p-3.5 text-xs leading-relaxed text-foreground/70">
              <p>
                <span className="font-semibold text-foreground">{dict.scan.step4.procedureLabel} </span>
                {dict.solutions[m.key].procedureInfo}
              </p>
              <p>
                <span className="font-semibold text-foreground">{dict.scan.step4.cosmeticLabel} </span>
                {dict.solutions[m.key].cosmeticInfo}
              </p>
            </div>
          </div>
        ))}
      </div>

      <details className="motion-scroll rounded-3xl border border-brand-border p-5 text-xs leading-relaxed text-foreground/70">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          {dict.scan.step4.methodologyToggle}
        </summary>
        <div className="mt-2 flex flex-col gap-1.5">
          {dict.scan.step4.methodology.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="text-foreground/50">{dict.scan.step4.methodologyFootnote}</p>
        </div>
      </details>

      <p className="text-xs text-foreground/50">{dict.solutionDisclaimer}</p>

      <div className="motion-scroll">
        <PromoBanner title={dict.promo.title} body={dict.promo.body} cta={dict.promo.cta} />
      </div>
    </section>
  );
}
