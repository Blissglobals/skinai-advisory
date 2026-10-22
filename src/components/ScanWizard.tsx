"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import NeedChip from "@/components/NeedChip";
import ScanResult from "@/components/ScanResult";
import PrecisionScan from "@/components/PrecisionScan";
import { ScanHeader } from "@/components/site/ui";
import { siteImages } from "@/content/site/images";
import CameraCapture, { type CameraCaptureHandle } from "@/components/CameraCapture";
import { analysisEngine } from "@/lib/analysis/mediapipeEngine";
import type { DeepScanResult, FaceScanResult, SkinMetricKey } from "@/lib/analysis/types";
import { BASE_VIDEO, useCameraStream } from "@/hooks/useCameraStream";
import type { Dictionary } from "@/i18n/getDictionary";

interface FailureChoice {
  reason: string;
  allowProceed: boolean;
}

// 시술 상담은 성인 대상이라 상담 버튼만 미성년자에게 숨깁니다.
// 재미용 스캔 자체는 나이 제한이 없습니다.
const MIN_AGE_FOR_CONSULT = 19;

function StepTitle({ badge, heading }: { badge: string; heading: string }) {
  return (
    <div className="motion-rise shrink-0">
      <p className="text-xs font-medium tracking-wide text-brand-accent">{badge}</p>
      <h1 className="font-display mt-1.5 text-[24px] leading-snug font-semibold">{heading}</h1>
    </div>
  );
}

export default function ScanWizard({
  dict,
  locale,
  brand,
  aiNotice,
}: {
  dict: Dictionary;
  locale: string;
  brand: string;
  aiNotice: string;
}) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [faceScan, setFaceScan] = useState<FaceScanResult | null>(null);
  const [selectedNeed, setSelectedNeed] = useState<SkinMetricKey | null>(null);
  const [deepScan, setDeepScan] = useState<DeepScanResult | null>(null);
  const [cameraKey, setCameraKey] = useState(0);
  const [userAge, setUserAge] = useState<number | null>(null);
  // 단계는 주소(?s=)에 남겨서 휴대폰 뒤로가기가 이전 단계로 가게 합니다.
  // 데이터 없이 중간 단계 주소로 들어오면(새로고침 등) 처음부터 시작합니다.
  const urlStep = Number(useSearchParams().get("s")) || 1;
  const step = (urlStep >= 2 && userAge === null) || (urlStep >= 3 && !deepScan) ? 1 : urlStep;
  const goStep = (n: number, replace = false) =>
    window.history[replace ? "replaceState" : "pushState"](null, "", `?s=${n}`);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);
  const consecutiveFailuresRef = useRef(0);
  const [retryNotice, setRetryNotice] = useState<string | null>(null);
  const [failureChoice, setFailureChoice] = useState<FailureChoice | null>(null);
  // 촬영 단계에서만 카메라를 켭니다(결과 화면에서는 꺼짐, 정밀 분석은 자체 스트림).
  const { stream, error: streamError } = useCameraStream(
    dict.cameraStream.permissionError,
    step === 2 ? BASE_VIDEO : null
  );

  const cameraRef = useRef<CameraCaptureHandle>(null);

  const metricLabels: Record<SkinMetricKey, string> = {
    pore: dict.metrics.pore.label,
    wrinkle: dict.metrics.wrinkle.label,
    pigment: dict.metrics.pigment.label,
    elasticity: dict.metrics.elasticity.label,
  };

  function handleCaptureFailure(reason: string, wasForceAttempt: boolean) {
    if (wasForceAttempt) {
      // "그래도 진행하기"로 완화된 기준마저 통과하지 못한 경우 —
      // 계산할 데이터 자체가 부족한 것이라 재촬영만 안내합니다.
      setFailureChoice({ reason, allowProceed: false });
      return;
    }
    const next = consecutiveFailuresRef.current + 1;
    consecutiveFailuresRef.current = next;
    if (next >= 2) {
      setFailureChoice({ reason, allowProceed: true });
    } else {
      setRetryNotice(dict.scan.retryingNotice);
      setTimeout(() => {
        setRetryNotice(null);
        setCameraKey((k) => k + 1);
      }, 1000);
    }
  }

  async function handleCapture(forceAccept: boolean = false) {
    if (loading) return;
    const video = cameraRef.current?.getVideoElement();
    if (!video) return;
    if (!cameraRef.current?.isReady()) {
      setErrorMsg(dict.scan.cameraPreparing);
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const { face, deep } = await analysisEngine.scan(video, dict.analysisMessages, metricLabels, forceAccept);
      setFaceScan(face);
      setDeepScan(deep);
      // 결과에서 뒤로가기를 누르면 촬영(자동 재촬영)이 아니라 처음 화면으로 가도록 바꿔치기합니다.
      goStep(3, true);
      consecutiveFailuresRef.current = 0;
      setFailureChoice(null);
    } catch (e) {
      const reason = e instanceof Error ? e.message : dict.scan.analysisError;
      handleCaptureFailure(reason, forceAccept);
    } finally {
      setLoading(false);
    }
  }

  function handleRetake() {
    setFailureChoice(null);
    consecutiveFailuresRef.current = 0;
    setCameraKey((k) => k + 1);
  }

  function handleProceedAnyway() {
    setFailureChoice(null);
    handleCapture(true);
  }

  const needOptionOrder: SkinMetricKey[] = ["elasticity", "pigment", "pore", "wrinkle"];
  // 목표 선택 타일 사진(홈페이지 분위기 이미지 재사용).
  const needImage: Record<SkinMetricKey, string> = {
    pigment: siteImages.concern.pigment,
    pore: siteImages.concern.pore,
    wrinkle: siteImages.concern.wrinkle,
    elasticity: siteImages.concern.elasticity,
  };

  return (
    <div className="site-theme app-shell gap-5">
      <ScanHeader homeHref={`/${locale}`} brand={brand} />
      {step <= 3 && <ProgressBar currentStep={step} labels={dict.scan.stepLabels} />}

      {errorMsg && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          {errorMsg}
        </p>
      )}

      {retryNotice && (
        <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-6">
          <div className="rounded-full bg-black/70 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur">
            {retryNotice}
          </div>
        </div>
      )}

      {failureChoice && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center">
          <div className="motion-rise w-full max-w-sm rounded-3xl bg-brand-surface p-6 text-center shadow-tinted">
            <p className="font-display text-lg font-semibold">
              {failureChoice.allowProceed ? dict.scan.persistentFailureTitle : dict.scan.retakeNeeded}
            </p>
            <p className="mt-2 text-sm text-foreground/65">{failureChoice.reason}</p>
            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleRetake}
                className="min-h-12 w-full rounded-2xl bg-brand-primary px-4 text-sm font-semibold text-brand-primary-fg active:scale-[0.98]"
              >
                {dict.scan.retakeButton}
              </button>
              {failureChoice.allowProceed && (
                <button
                  type="button"
                  onClick={handleProceedAnyway}
                  className="min-h-12 w-full rounded-2xl px-4 text-sm font-medium text-foreground/70 hover:bg-foreground/[.04] active:scale-[0.98]"
                >
                  {dict.scan.proceedAnyway}
                </button>
              )}
            </div>
            {failureChoice.allowProceed && (
              <p className="mt-2 text-[11px] text-foreground/40">{dict.scan.proceedAnywayHint}</p>
            )}
          </div>
        </div>
      )}

      {step === 1 && (
        <section className="flex flex-col gap-6">
          <StepTitle badge={dict.scan.goal.badge} heading={dict.scan.goal.heading} />

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              {needOptionOrder.map((key) => (
                <NeedChip
                  key={key}
                  label={dict.scan.needOptions[key]}
                  image={needImage[key]}
                  selected={selectedNeed === key}
                  onClick={() => setSelectedNeed(key)}
                />
              ))}
            </div>
            <p className="text-xs text-foreground/45">{aiNotice}</p>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-3xl bg-brand-secondary px-5 py-4">
            <div>
              <label className="text-sm font-medium" htmlFor="user-age">
                {dict.scan.step2.ageInputLabel}
              </label>
              {userAge === null && (
                <p className="mt-0.5 text-xs text-foreground/50">{dict.scan.step2.ageRequired}</p>
              )}
            </div>
            <input
              id="user-age"
              type="number"
              inputMode="numeric"
              min={10}
              max={99}
              placeholder={dict.scan.step2.agePlaceholder}
              value={userAge ?? ""}
              onChange={(e) => setUserAge(e.target.value ? Number(e.target.value) : null)}
              className="font-display h-12 w-20 shrink-0 rounded-xl border border-brand-border bg-brand-surface text-center text-lg font-semibold"
            />
          </div>

          <button
            type="button"
            onClick={() => goStep(2)}
            disabled={!selectedNeed || userAge === null}
            className="min-h-14 w-full rounded-2xl bg-brand-primary px-4 text-[15px] font-semibold text-brand-primary-fg shadow-tinted active:scale-[0.98] disabled:opacity-35 disabled:active:scale-100"
          >
            {dict.scan.goal.next}
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="flex min-h-0 flex-1 flex-col gap-4">
          <div className="shrink-0">
            <StepTitle badge={dict.scan.step1.badge} heading={dict.scan.step1.heading} />
            <p className="mt-1 text-sm text-foreground/55">
              {dict.scan.step1.hintPrefix}{" "}
              <span className="font-semibold text-brand-accent">{dict.scan.step1.hintAuto}</span>
              {dict.scan.step1.hintSuffix}
            </p>
          </div>
          <div className="min-h-0 flex-1">
            <CameraCapture
              key={cameraKey}
              ref={cameraRef}
              guideLabel={dict.scan.step1.guideLabel}
              autoCapture
              onAutoCapture={() => handleCapture()}
              stream={stream}
              streamError={streamError}
              dict={dict}
              analyzing={loading}
              analyzingLabel={dict.scan.step1.analyzing}
            />
          </div>
        </section>
      )}

      {step === 3 && faceScan && deepScan && (
        <ScanResult
          dict={dict}
          deepScan={deepScan}
          faceScan={faceScan}
          lowConfidence={faceScan.lowConfidence || deepScan.lowConfidence}
          userAge={userAge}
          focusMetric={selectedNeed}
          minAgeForConsult={MIN_AGE_FOR_CONSULT}
          onStartPrecision={() => goStep(4)}
        />
      )}

      {step === 4 && (
        <PrecisionScan
          dict={dict}
          canConsult={userAge === null || userAge >= MIN_AGE_FOR_CONSULT}
          onBack={() => goStep(3)}
        />
      )}
    </div>
  );
}
