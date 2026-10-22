"use client";

import { useRef, useState } from "react";
import CameraCapture, { type CameraCaptureHandle } from "@/components/CameraCapture";
import CloseupCapture, { type CloseupDeviceInfo, type CloseupShot } from "@/components/CloseupCapture";
import CountUp from "@/components/CountUp";
import { useCameraStream } from "@/hooks/useCameraStream";
import { analysisEngine } from "@/lib/analysis/mediapipeEngine";
import { getFaceLandmarker, pixelsPerMm, tryDetectLandmarksForVideoFrame } from "@/lib/analysis/landmarks";
import type { CloseupKind } from "@/lib/analysis/closeupFilters";
import type { DeepScanResult, SkinMetricKey } from "@/lib/analysis/types";
import { formatScoreOutOf10 } from "@/lib/format";
import { lineConsultUrl } from "@/lib/line/consult";
import type { Dictionary } from "@/i18n/getDictionary";

type Mode = "self" | "helper";
type Stage = "intro" | "face" | CloseupKind | "result";

const ZONES: CloseupKind[] = ["pigment", "wrinkle", "pore"];
const PRECISION_KEYS: SkinMetricKey[] = ["pore", "wrinkle", "pigment"];
// 화면 조명(흰 화면)으로 바뀐 밝기에 카메라 자동 노출이 따라올 시간.
const FLASH_SETTLE_MS = 500;

const FACE_VIDEO: MediaTrackConstraints = { facingMode: "user", width: { ideal: 1920 }, height: { ideal: 1080 } };
const closeupVideo = (mode: Mode): MediaTrackConstraints => ({
  facingMode: mode === "helper" ? { ideal: "environment" } : "user",
  width: { ideal: 1920 },
  height: { ideal: 1080 },
});

const isZone = (stage: Stage): stage is CloseupKind => (ZONES as string[]).includes(stage);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * 정밀 분석(테스트 버전): 전체 얼굴 정밀 촬영 1장 + 부위 확대 3장.
 * 점수는 전체 얼굴 촬영(고해상도·화면 조명·여러 프레임)에서 계산하고,
 * 확대 사진은 필터 시각화와 기기 측정값 수집에 씁니다.
 */
export default function PrecisionScan({
  dict,
  canConsult,
  onBack,
}: {
  dict: Dictionary;
  canConsult: boolean;
  onBack: () => void;
}) {
  const p = dict.precision;
  const [mode, setMode] = useState<Mode>("self");
  const [stage, setStage] = useState<Stage>("intro");
  const [deep, setDeep] = useState<DeepScanResult | null>(null);
  const [faceInfo, setFaceInfo] = useState<{ resolution: string; pxPerMm: number | null } | null>(null);
  const [closeInfo, setCloseInfo] = useState<CloseupDeviceInfo | null>(null);
  const [shots, setShots] = useState<Partial<Record<CloseupKind, CloseupShot>>>({});
  const [flashing, setFlashing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraKey, setCameraKey] = useState(0);
  const cameraRef = useRef<CameraCaptureHandle>(null);

  const video = stage === "face" ? FACE_VIDEO : isZone(stage) ? closeupVideo(mode) : null;
  const { stream, error: streamError } = useCameraStream(dict.cameraStream.permissionError, video);

  const metricLabels: Record<SkinMetricKey, string> = {
    pore: dict.metrics.pore.label,
    wrinkle: dict.metrics.wrinkle.label,
    pigment: dict.metrics.pigment.label,
    elasticity: dict.metrics.elasticity.label,
  };

  function nextZone(from: CloseupKind) {
    const i = ZONES.indexOf(from);
    setStage(i < ZONES.length - 1 ? ZONES[i + 1] : "result");
  }

  async function handleFaceCapture() {
    const v = cameraRef.current?.getVideoElement();
    if (!v) return;
    setFlashing(true);
    setError(null);
    try {
      await sleep(FLASH_SETTLE_MS);
      const { deep } = await analysisEngine.scan(v, dict.analysisMessages, metricLabels);
      const landmarks = tryDetectLandmarksForVideoFrame(await getFaceLandmarker(), v, performance.now());
      setFaceInfo({
        resolution: `${v.videoWidth}×${v.videoHeight}`,
        pxPerMm: landmarks ? pixelsPerMm(landmarks, v.videoWidth, v.videoHeight) : null,
      });
      setDeep(deep);
      setStage(ZONES[0]);
    } catch (e) {
      setError(e instanceof Error ? e.message : dict.scan.analysisError);
    } finally {
      setFlashing(false);
    }
  }

  // 화면을 흰색 조명처럼 쓰는 단계(전체 얼굴, 혼자 찍는 확대 촬영).
  const ringLight = stage === "face" || (mode === "self" && isZone(stage));

  return (
    <div
      className={
        ringLight
          ? "fixed inset-0 z-40 flex flex-col gap-4 overflow-y-auto bg-white px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-8 text-[#23201c]"
          : "flex flex-col gap-6"
      }
    >
      {flashing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-white pb-16">
          <p className="motion-pulse text-sm font-medium text-[#23201c]/60">{p.faceFlash}</p>
        </div>
      )}

      {stage === "intro" && (
        <section className="flex flex-col gap-6">
          <div className="motion-rise">
            <p className="text-xs font-medium tracking-wide text-brand-accent">{p.badge}</p>
            <h1 className="font-display mt-1.5 text-[24px] leading-snug font-semibold whitespace-pre-line">
              {p.introHeading}
            </h1>
          </div>
          <ol className="flex flex-col gap-2">
            {p.introSteps.map((text, i) => (
              <li key={text} className="flex items-center gap-3 rounded-2xl bg-brand-surface px-4 py-3 text-sm shadow-tinted">
                <span className="font-display flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-xs font-semibold">
                  {i + 1}
                </span>
                {text}
              </li>
            ))}
          </ol>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">{p.modeLabel}</p>
            <div className="grid grid-cols-2 gap-2">
              {(["self", "helper"] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-2xl border p-3 text-left active:scale-[0.98] ${
                    mode === m ? "border-brand-accent bg-brand-secondary" : "border-brand-border"
                  }`}
                >
                  <p className="text-sm font-semibold">{m === "self" ? p.modeSelf : p.modeHelper}</p>
                  <p className="mt-1 text-xs text-foreground/55">{m === "self" ? p.modeSelfHint : p.modeHelperHint}</p>
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-foreground/50">{p.notice}</p>
          <button
            type="button"
            onClick={() => setStage("face")}
            className="min-h-14 rounded-2xl bg-brand-primary text-[15px] font-semibold text-brand-primary-fg shadow-tinted active:scale-[0.98]"
          >
            {p.start}
          </button>
          <button type="button" onClick={onBack} className="text-sm text-foreground/55 underline underline-offset-4">
            {p.backToBase}
          </button>
        </section>
      )}

      {stage === "face" && (
        <>
          <div>
            <p className="text-xs font-medium tracking-wide text-brand-accent">{p.faceBadge}</p>
            <h1 className="font-display mt-1 text-xl font-semibold">{p.faceHeading}</h1>
          </div>
          {/* 카메라 창을 작게 두고 나머지를 흰 화면으로 채워 얼굴에 빛을 줍니다. */}
          <div className="mx-auto aspect-[3/4] w-[78%]">
            <CameraCapture
              key={cameraKey}
              ref={cameraRef}
              guideLabel={dict.scan.step1.guideLabel}
              autoCapture={!error}
              onAutoCapture={handleFaceCapture}
              stream={stream}
              streamError={streamError}
              dict={dict}
            />
          </div>
          {error && (
            <div className="flex flex-col gap-2 text-center">
              <p className="text-sm text-red-700">{error}</p>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setCameraKey((k) => k + 1);
                }}
                className="min-h-12 rounded-2xl bg-brand-primary text-sm font-semibold text-brand-primary-fg"
              >
                {p.retry}
              </button>
            </div>
          )}
        </>
      )}

      {isZone(stage) && (
        <>
          <div>
            <p className="text-xs font-medium tracking-wide text-brand-accent">{p.zones[stage].badge}</p>
            <h1 className="font-display mt-1 text-xl font-semibold">{p.zones[stage].heading}</h1>
          </div>
          <CloseupCapture
            key={stage}
            kind={stage}
            stream={stream}
            streamError={streamError}
            mirror={mode === "self"}
            dict={dict}
            onInfo={setCloseInfo}
            onSkip={() => nextZone(stage)}
            onDone={(shot) => {
              setShots((s) => ({ ...s, [stage]: shot }));
              nextZone(stage);
            }}
          />
        </>
      )}

      {stage === "result" && deep && (
        <PrecisionResult
          dict={dict}
          deep={deep}
          shots={shots}
          faceInfo={faceInfo}
          closeInfo={closeInfo}
          canConsult={canConsult}
          onBack={onBack}
        />
      )}
    </div>
  );
}

function PrecisionResult({
  dict,
  deep,
  shots,
  faceInfo,
  closeInfo,
  canConsult,
  onBack,
}: {
  dict: Dictionary;
  deep: DeepScanResult;
  shots: Partial<Record<CloseupKind, CloseupShot>>;
  faceInfo: { resolution: string; pxPerMm: number | null } | null;
  closeInfo: CloseupDeviceInfo | null;
  canConsult: boolean;
  onBack: () => void;
}) {
  const p = dict.precision;
  const metrics = deep.metrics.filter((m) => PRECISION_KEYS.includes(m.key));
  const overall = Math.round(metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length);
  const scoreLine = metrics.map((m) => `${m.label} ${formatScoreOutOf10(m.score)}`).join(" · ");
  const consultUrl = lineConsultUrl([
    dict.consult.message.title,
    `${p.consultTag}: ${formatScoreOutOf10(overall)} ${dict.consult.message.outOf}`,
    scoreLine,
  ]);
  const sharpnessLine = ZONES.filter((k) => shots[k])
    .map((k) => `${dict.metrics[k].label} ${shots[k]!.sharpness} (${shots[k]!.sizePx}px)`)
    .join(" · ");

  const deviceRows: [string, string][] = [
    [p.device.faceRes, faceInfo?.resolution ?? p.unknown],
    [p.device.pxPerMm, faceInfo?.pxPerMm ? faceInfo.pxPerMm.toFixed(1) : p.unknown],
    [p.device.closeRes, closeInfo?.resolution ?? p.unknown],
    [p.device.torch, closeInfo ? (closeInfo.torch ? p.supported : p.unsupported) : p.unknown],
    [p.device.sharpness, sharpnessLine || p.unknown],
  ];

  return (
    <section className="flex flex-col gap-6">
      <div className="motion-rise">
        <p className="text-xs font-medium tracking-wide text-brand-accent">{p.resultBadge}</p>
        <h1 className="font-display mt-1.5 text-[24px] font-semibold">
          {p.resultHeading}{" "}
          <CountUp value={overall} format={formatScoreOutOf10} />
          <span className="ml-1 text-sm font-normal text-foreground/50">{dict.scan.step4.outOf10}</span>
        </h1>
      </div>

      {deep.lowConfidence && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
          {dict.scan.step4.lowConfidence}
        </p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {metrics.map((m) => (
          <div key={m.key} className="motion-rise rounded-3xl bg-brand-surface p-4 shadow-tinted">
            <p className="text-xs text-foreground/55">{m.label}</p>
            <p className="font-display mt-1 text-2xl font-semibold">
              <CountUp value={m.score} format={formatScoreOutOf10} />
            </p>
          </div>
        ))}
      </div>

      {ZONES.some((k) => shots[k]) && (
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-display text-lg font-semibold">{p.closeupTitle}</p>
            <p className="mt-0.5 text-xs text-foreground/50">{p.notice}</p>
          </div>
          {ZONES.filter((k) => shots[k]).map((k) => (
            <CloseupCard key={k} label={p.zones[k].filter} shot={shots[k]!} dict={dict} />
          ))}
        </div>
      )}

      {canConsult ? (
        <a
          href={consultUrl}
          className="shadow-tinted flex min-h-14 items-center justify-center rounded-2xl bg-brand-accent px-4 text-[15px] font-semibold text-brand-accent-fg active:scale-[0.98]"
        >
          {dict.consult.cta}
        </a>
      ) : (
        <p className="text-center text-xs text-foreground/40">{dict.consult.ageRestricted}</p>
      )}

      <div className="rounded-3xl border border-brand-border p-5">
        <p className="text-sm font-semibold">{p.deviceTitle}</p>
        <p className="mt-0.5 text-xs text-foreground/50">{p.deviceNote}</p>
        <dl className="mt-3 flex flex-col gap-1.5 text-xs">
          {deviceRows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <dt className="text-foreground/55">{label}</dt>
              <dd className="text-right font-medium tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <button type="button" onClick={onBack} className="text-sm text-foreground/55 underline underline-offset-4">
        {p.backToBase}
      </button>
    </section>
  );
}

function CloseupCard({ label, shot, dict }: { label: string; shot: CloseupShot; dict: Dictionary }) {
  const [showFilter, setShowFilter] = useState(true);
  const p = dict.precision;
  return (
    <div className="motion-scroll overflow-hidden rounded-3xl bg-brand-surface shadow-tinted">
      <div className="relative aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shot.original} alt="" className="absolute inset-0 size-full object-cover" />
        {showFilter && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shot.filtered} alt="" className="motion-wipe absolute inset-0 size-full object-cover" />
        )}
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <p className="text-sm font-semibold">{label}</p>
        <div className="flex rounded-full bg-foreground/[.06] p-1 text-xs">
          {[false, true].map((filter) => (
            <button
              key={String(filter)}
              type="button"
              onClick={() => setShowFilter(filter)}
              className={`rounded-full px-3 py-1 ${showFilter === filter ? "bg-brand-surface font-semibold shadow-sm" : "text-foreground/55"}`}
            >
              {filter ? p.showFilter : p.showOriginal}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
