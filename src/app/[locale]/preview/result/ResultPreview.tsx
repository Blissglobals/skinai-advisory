"use client";

import { useRef, useState } from "react";
import ScanResult from "@/components/ScanResult";
import type { DeepScanResult, SkinMetricKey } from "@/lib/analysis/types";
import type { Dictionary } from "@/i18n/getDictionary";

const SAMPLES: Record<string, { scores: Record<SkinMetricKey, number>; lowConfidence: boolean }> = {
  보통: { scores: { pore: 62, wrinkle: 71, pigment: 54, elasticity: 78 }, lowConfidence: false },
  높음: { scores: { pore: 88, wrinkle: 84, pigment: 91, elasticity: 86 }, lowConfidence: false },
  낮음: { scores: { pore: 41, wrinkle: 38, pigment: 47, elasticity: 52 }, lowConfidence: true },
};

export default function ResultPreview({ dict }: { dict: Dictionary }) {
  const [sampleName, setSampleName] = useState("보통");
  const [age, setAge] = useState<number | null>(32);
  const [replayKey, setReplayKey] = useState(0);
  // app-shell 자체가 스크롤 컨테이너라 window가 아니라 이 요소를 올려야 합니다.
  const shellRef = useRef<HTMLDivElement>(null);

  const sample = SAMPLES[sampleName];
  const metrics = (Object.keys(sample.scores) as SkinMetricKey[]).map((key) => ({
    key,
    label: dict.metrics[key].label,
    score: sample.scores[key],
  }));
  const deepScan: DeepScanResult = {
    metrics,
    overallScore: Math.round(metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length),
    lowConfidence: sample.lowConfidence,
  };

  return (
    <div ref={shellRef} className="app-shell gap-4">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-brand-border p-2 text-xs">
        <span className="font-medium text-foreground/60">미리보기</span>
        {Object.keys(SAMPLES).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => {
              setSampleName(name);
              setReplayKey((k) => k + 1);
            }}
            className={`min-h-8 rounded-full border px-3 ${
              name === sampleName
                ? "border-brand-primary bg-brand-primary text-brand-primary-fg"
                : "border-brand-border"
            }`}
          >
            {name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setAge((a) => (a === null ? 32 : null))}
          className="min-h-8 rounded-full border border-brand-border px-3"
        >
          나이 {age === null ? "없음" : age}
        </button>
        <button
          type="button"
          onClick={() => {
            shellRef.current?.scrollTo({ top: 0 });
            setReplayKey((k) => k + 1);
          }}
          className="ml-auto min-h-8 rounded-full bg-brand-accent px-3 text-brand-accent-fg"
        >
          다시 재생
        </button>
      </div>

      <ScanResult
        key={replayKey}
        dict={dict}
        deepScan={deepScan}
        lowConfidence={deepScan.lowConfidence}
        userAge={age}
        minAgeForLineReport={19}
      />
    </div>
  );
}
