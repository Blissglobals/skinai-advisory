"use client";

import { useState } from "react";
import { analysisEngine } from "@/lib/analysis/mediapipeEngine";
import type { AnalysisMessages, SkinMetricKey } from "@/lib/analysis/types";

// 정면에 가까운 AI 인물 사진들(실제 사람이 아님). 실제 촬영 데이터가 생기면 교체합니다.
const FACES = [
  "/images/site/concern-acne.webp",
  "/images/site/concern-redness.webp",
  "/images/site/concern-wrinkle.webp",
  "/images/site/concern-pigment.webp",
];

const SIZE = 1024;
const TOLERANCE = 8; // 점수(0~100) 허용 흔들림
const LABELS: Record<SkinMetricKey, string> = { pore: "pore", wrinkle: "wrinkle", pigment: "pigment", elasticity: "elasticity" };

type Variant = { name: string; scale: number; gain: [number, number, number] };
const VARIANTS: Variant[] = [
  { name: "base", scale: 1, gain: [1, 1, 1] },
  { name: "far (60%)", scale: 0.6, gain: [1, 1, 1] },
  { name: "dark (×0.75)", scale: 1, gain: [0.75, 0.75, 0.75] },
  { name: "warm light", scale: 1, gain: [1.08, 1, 0.9] },
  { name: "cool light", scale: 1, gain: [0.92, 1, 1.1] },
];

interface Row {
  face: string;
  variant: string;
  pore?: number;
  wrinkle?: number;
  pigment?: number;
  overall?: number;
  undertone?: string;
  fitzpatrick?: string;
  error?: string;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function renderVariant(img: HTMLImageElement, v: Variant): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#e9e4dc";
  ctx.fillRect(0, 0, SIZE, SIZE);
  const w = SIZE * v.scale;
  ctx.drawImage(img, (SIZE - w) / 2, (SIZE - w) / 2, w, w);
  if (v.gain.some((g) => g !== 1)) {
    const data = ctx.getImageData(0, 0, SIZE, SIZE);
    for (let i = 0; i < data.data.length; i += 4) {
      data.data[i] = Math.min(255, data.data[i] * v.gain[0]);
      data.data[i + 1] = Math.min(255, data.data[i + 1] * v.gain[1]);
      data.data[i + 2] = Math.min(255, data.data[i + 2] * v.gain[2]);
    }
    ctx.putImageData(data, 0, 0);
  }
  return canvas;
}

export default function EngineCheck({ messages }: { messages: AnalysisMessages }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [running, setRunning] = useState(false);

  async function run() {
    setRunning(true);
    const out: Row[] = [];
    for (const face of FACES) {
      const img = await loadImage(face);
      for (const v of VARIANTS) {
        const canvas = renderVariant(img, v);
        const row: Row = { face: face.split("/").pop()!, variant: v.name };
        try {
          const faceScan = await analysisEngine.scanFace(canvas, messages, LABELS, true);
          const deep = await analysisEngine.scanZone(canvas, "pore", messages, LABELS, true);
          const by = Object.fromEntries(deep.metrics.map((m) => [m.key, m.score]));
          Object.assign(row, {
            pore: by.pore,
            wrinkle: by.wrinkle,
            pigment: by.pigment,
            overall: deep.overallScore,
            undertone: faceScan.undertone,
            fitzpatrick: faceScan.fitzpatrick,
          });
        } catch (e) {
          row.error = e instanceof Error ? e.message : String(e);
        }
        out.push(row);
        setRows([...out]);
      }
    }
    setRunning(false);
  }

  // 각 얼굴의 base 대비 최대 편차
  const worst = (key: "pore" | "wrinkle" | "pigment") => {
    let max = 0;
    for (const r of rows) {
      const base = rows.find((b) => b.face === r.face && b.variant === "base");
      if (base?.[key] !== undefined && r[key] !== undefined) max = Math.max(max, Math.abs(r[key]! - base[key]!));
    }
    return max;
  };
  const colorFlips = rows.filter((r) => {
    const base = rows.find((b) => b.face === r.face && b.variant === "base");
    return base && (r.undertone !== base.undertone || r.fitzpatrick !== base.fitzpatrick);
  }).length;

  return (
    <div className="site-theme min-h-dvh p-4 text-sm">
      <h1 className="font-display text-2xl font-semibold">Engine consistency check</h1>
      <p className="mt-1 text-foreground/60">
        Same face, different size / brightness / light color. Tolerance ±{TOLERANCE} points.
      </p>
      <button
        type="button"
        onClick={run}
        disabled={running}
        className="mt-3 rounded-xl bg-brand-primary px-4 py-2 font-semibold text-brand-primary-fg disabled:opacity-40"
      >
        {running ? "Running…" : "Run check"}
      </button>

      {rows.length > 0 && (
        <>
          <p id="engine-summary" className="mt-4 font-mono text-xs">
            {(["pore", "wrinkle", "pigment"] as const)
              .map((k) => `${k} maxΔ=${worst(k)} ${worst(k) <= TOLERANCE ? "PASS" : "FAIL"}`)
              .join(" | ")}
            {` | color label changes=${colorFlips}`}
          </p>
          <table id="engine-table" className="mt-3 w-full border-collapse font-mono text-[11px]">
            <thead>
              <tr className="text-left">
                {["face", "variant", "pore", "wrinkle", "pigment", "overall", "tone", "fitz"].map((h) => (
                  <th key={h} className="border-b border-brand-border py-1 pr-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="py-0.5 pr-2">{r.face.replace(".webp", "")}</td>
                  <td className="pr-2">{r.variant}</td>
                  {r.error ? (
                    <td colSpan={6} className="text-red-600">{r.error}</td>
                  ) : (
                    <>
                      <td className="pr-2">{r.pore}</td>
                      <td className="pr-2">{r.wrinkle}</td>
                      <td className="pr-2">{r.pigment}</td>
                      <td className="pr-2">{r.overall}</td>
                      <td className="pr-2">{r.undertone}</td>
                      <td>{r.fitzpatrick}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
