"use client";

import { useEffect, useRef, useState } from "react";
import { closeupFilter, sharpness, type CloseupKind } from "@/lib/analysis/closeupFilters";
import { playBeep, playShutterClick } from "@/lib/shutterSound";
import type { Dictionary } from "@/i18n/getDictionary";

export interface CloseupShot {
  original: string;
  filtered: string;
  sharpness: number;
  sizePx: number;
}

export interface CloseupDeviceInfo {
  resolution: string;
  torch: boolean;
}

// 화면의 네모 가이드 = 영상 짧은 변의 60% 정사각형. 이 영역만 잘라 씁니다.
const CROP_RATIO = 0.6;
const OUTPUT_MAX_PX = 768;
const BURST = 4;
const BURST_GAP_MS = 90;
// 거울 촬영은 화면을 누르기 어려워 카운트다운 뒤 자동으로 찍습니다.
// 손이 조금 흔들려도 되도록 더 많이, 더 길게 찍어 가장 선명한 장을 고릅니다.
const AUTO_SECONDS = 6;
const AUTO_BURST = 8;
const AUTO_BURST_GAP_MS = 150;
// ponytail: 임시 기준값(AI 샘플 기준 추정). 기기별 측정값이 쌓이면 다시 정합니다.
const SHARP_MIN = 6;

// torch는 표준 타입에 없어서(안드로이드 크롬 등 일부만 지원) 직접 읽습니다.
const hasTorch = (track?: MediaStreamTrack) =>
  !!(track?.getCapabilities?.() as { torch?: boolean } | undefined)?.torch;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function grabCenter(video: HTMLVideoElement, maxPx: number): HTMLCanvasElement {
  const side = Math.round(Math.min(video.videoWidth, video.videoHeight) * CROP_RATIO);
  const out = Math.min(side, maxPx);
  const canvas = document.createElement("canvas");
  canvas.width = out;
  canvas.height = out;
  canvas
    .getContext("2d", { willReadFrequently: true })!
    .drawImage(video, (video.videoWidth - side) / 2, (video.videoHeight - side) / 2, side, side, 0, 0, out, out);
  return canvas;
}

const pixels = (c: HTMLCanvasElement) => c.getContext("2d", { willReadFrequently: true })!.getImageData(0, 0, c.width, c.height);

/** 확대 촬영 1장: 가운데 네모를 여러 장 연속으로 찍어 가장 선명한 것을 고릅니다. */
export default function CloseupCapture({
  kind,
  stream,
  streamError,
  mirror,
  autoTimer = false,
  dict,
  onDone,
  onSkip,
  onInfo,
}: {
  kind: CloseupKind;
  stream: MediaStream | null;
  streamError: string | null;
  mirror: boolean;
  autoTimer?: boolean;
  dict: Dictionary;
  onDone: (shot: CloseupShot) => void;
  onSkip: () => void;
  onInfo: (info: CloseupDeviceInfo) => void;
}) {
  const p = dict.precision;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [torchFailed, setTorchFailed] = useState(false);
  // null = 아직 조작 안 함 → 트랙의 현재 상태를 따름(부위가 바뀌어도 같은 스트림을 씀).
  const [torchChoice, setTorchChoice] = useState<boolean | null>(null);
  const [sharp, setSharp] = useState(0);
  const [busy, setBusy] = useState(false);
  const [count, setCount] = useState(AUTO_SECONDS);
  const captureRef = useRef<() => Promise<void>>(async () => {});
  const track = stream?.getVideoTracks()[0];
  const torchSupported = hasTorch(track) && !torchFailed;
  const torchOn = torchChoice ?? !!(track?.getSettings() as { torch?: boolean } | undefined)?.torch;

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      if (!video || video.videoWidth === 0 || busy) return;
      setSharp(sharpness(pixels(grabCenter(video, 256))));
    }, 400);
    return () => clearInterval(interval);
  }, [busy]);

  useEffect(() => {
    if (!autoTimer || !stream) return;
    let n = AUTO_SECONDS;
    const tick = setInterval(() => {
      n -= 1;
      playBeep(n === 0 ? 1320 : 880);
      setCount(n);
      if (n <= 0) {
        clearInterval(tick);
        void captureRef.current();
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [autoTimer, stream]);

  async function toggleTorch() {
    if (!track) return;
    const next = !torchOn;
    try {
      await track.applyConstraints({ advanced: [{ torch: next } as MediaTrackConstraintSet] });
      setTorchChoice(next);
    } catch {
      setTorchFailed(true);
    }
  }

  async function capture() {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || busy) return;
    setBusy(true);
    playShutterClick();
    const burst = autoTimer ? AUTO_BURST : BURST;
    let best: HTMLCanvasElement | null = null;
    let bestScore = -1;
    for (let i = 0; i < burst; i++) {
      const canvas = grabCenter(video, OUTPUT_MAX_PX);
      const score = sharpness(pixels(canvas));
      if (score > bestScore) {
        best = canvas;
        bestScore = score;
      }
      if (i < burst - 1) await sleep(autoTimer ? AUTO_BURST_GAP_MS : BURST_GAP_MS);
    }
    const filtered = document.createElement("canvas");
    filtered.width = best!.width;
    filtered.height = best!.height;
    filtered.getContext("2d")!.putImageData(closeupFilter[kind](pixels(best!)), 0, 0);
    onDone({
      original: best!.toDataURL("image/jpeg", 0.9),
      filtered: filtered.toDataURL("image/jpeg", 0.9),
      sharpness: Math.round(bestScore * 10) / 10,
      sizePx: best!.width,
    });
  }

  useEffect(() => {
    captureRef.current = capture;
  });
  const isSharp = sharp >= SHARP_MIN;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] bg-black shadow-tinted">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onLoadedMetadata={(e) =>
            onInfo({
              resolution: `${e.currentTarget.videoWidth}×${e.currentTarget.videoHeight}${
                track?.getSettings().facingMode ? ` · ${track.getSettings().facingMode}` : ""
              }`,
              torch: hasTorch(track),
            })
          }
          className={`h-full w-full object-cover ${mirror ? "[transform:scaleX(-1)]" : ""}`}
        />
        <div
          className={`pointer-events-none absolute inset-[20%] rounded-2xl border-2 border-dashed transition-colors ${
            isSharp ? "border-[#8FD9BC]" : "border-white/80"
          }`}
        />
        <div className="absolute top-3 left-3 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          {isSharp ? p.sharp : p.blurry}
        </div>
        <div className="absolute inset-x-6 bottom-4 h-1.5 overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-[#8FD9BC] transition-[width] duration-300"
            style={{ width: `${Math.min(100, (sharp / SHARP_MIN) * 70)}%` }}
          />
        </div>
        {autoTimer && !busy && count > 0 && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-7xl font-semibold text-white drop-shadow-lg">{count}</span>
            <span className="mt-1 rounded-full bg-black/40 px-3 py-1 text-xs text-white">
              {count}
              {p.autoShot}
            </span>
          </div>
        )}
        {busy && <div className="pointer-events-none absolute inset-0 bg-white camera-flash" />}
        {streamError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4 text-center text-sm text-white">
            {streamError}
          </div>
        )}
      </div>

      <p className="text-xs text-current/60">{p.distanceHint}</p>

      {torchSupported ? (
        <button
          type="button"
          onClick={toggleTorch}
          className="min-h-11 rounded-2xl border border-current/15 text-sm font-medium active:scale-[0.98]"
        >
          {torchOn ? p.torchOff : p.torchOn}
        </button>
      ) : (
        !mirror && <p className="text-xs text-current/50">{p.torchUnsupported}</p>
      )}

      <button
        type="button"
        onClick={capture}
        disabled={busy || !stream}
        className="min-h-14 rounded-2xl bg-brand-primary text-[15px] font-semibold text-brand-primary-fg shadow-tinted active:scale-[0.98] disabled:opacity-40"
      >
        {p.shutter}
      </button>
      <button type="button" onClick={onSkip} className="text-sm text-current/55 underline underline-offset-4">
        {p.skip}
      </button>
    </div>
  );
}
