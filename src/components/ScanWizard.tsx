"use client";

import { useRef, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import NeedChip from "@/components/NeedChip";
import CameraCapture, { type CameraCaptureHandle } from "@/components/CameraCapture";
import { analysisEngine } from "@/lib/analysis/mediapipeEngine";
import type { DeepScanResult, FaceScanResult, SkinMetricKey } from "@/lib/analysis/types";
import { formatScoreOutOf10 } from "@/lib/format";
import { estimateAgePercentile } from "@/lib/percentile";
import { buildSolutionScenario } from "@/lib/solutionScenario";
import { useCameraStream } from "@/hooks/useCameraStream";
import type { Dictionary } from "@/i18n/getDictionary";

interface FailureChoice {
  reason: string;
  allowProceed: boolean;
}

// 라인으로 상세 리포트를 받으려면(=개인정보가 실제로 처리·보유되기
// 시작하는 지점) 미성년자를 걸러냅니다. 재미용 스캔 자체는 나이 제한이 없습니다.
const MIN_AGE_FOR_LINE_REPORT = 19;

export default function ScanWizard({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [faceScan, setFaceScan] = useState<FaceScanResult | null>(null);
  const [selectedNeed, setSelectedNeed] = useState<SkinMetricKey | null>(null);
  const [deepScan, setDeepScan] = useState<DeepScanResult | null>(null);
  const [cameraKey, setCameraKey] = useState(0);
  const [userAge, setUserAge] = useState<number | null>(null);
  const consecutiveFailuresRef = useRef(0);
  const [retryNotice, setRetryNotice] = useState<string | null>(null);
  const [failureChoice, setFailureChoice] = useState<FailureChoice | null>(null);
  const [showLineConsent, setShowLineConsent] = useState(false);
  const [lineConsentAgreed, setLineConsentAgreed] = useState(false);
  const [lineConnecting, setLineConnecting] = useState(false);
  const [lineError, setLineError] = useState<string | null>(null);
  const [liffUrl, setLiffUrl] = useState<string | null>(null);
  const { stream, error: streamError } = useCameraStream(
    dict.cameraStream.permissionError
  );

  const step1Ref = useRef<CameraCaptureHandle>(null);
  const step3Ref = useRef<CameraCaptureHandle>(null);

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

  async function handleStep1Capture(forceAccept: boolean = false) {
    if (loading) return;
    const video = step1Ref.current?.getVideoElement();
    if (!video) return;
    if (!step1Ref.current?.isReady()) {
      setErrorMsg(dict.scan.cameraPreparing);
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const gains = step1Ref.current?.getWhiteBalanceGains();
      const result = await analysisEngine.scanFace(
        video,
        dict.analysisMessages,
        metricLabels,
        gains,
        forceAccept
      );
      setFaceScan(result);
      setStep(2);
      consecutiveFailuresRef.current = 0;
      setFailureChoice(null);
    } catch (e) {
      const reason = e instanceof Error ? e.message : dict.scan.analysisError;
      handleCaptureFailure(reason, forceAccept);
    } finally {
      setLoading(false);
    }
  }

  async function handleStep3Capture(forceAccept: boolean = false) {
    if (loading || !selectedNeed) return;
    const video = step3Ref.current?.getVideoElement();
    if (!video) return;
    if (!step3Ref.current?.isReady()) {
      setErrorMsg(dict.scan.cameraPreparing);
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const gains = step3Ref.current?.getWhiteBalanceGains();
      const result = await analysisEngine.scanZone(
        video,
        selectedNeed,
        dict.analysisMessages,
        metricLabels,
        gains,
        forceAccept
      );
      setDeepScan(result);
      setStep(4);
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
    if (step === 1) {
      handleStep1Capture(true);
    } else if (step === 3) {
      handleStep3Capture(true);
    }
  }

  function closeLineConsent() {
    setShowLineConsent(false);
    setLineConsentAgreed(false);
    setLineError(null);
    setLiffUrl(null);
  }

  // 커스텀 스킴(line://)으로 우선 앱을 열어보고, 짧은 시간 안에 화면이
  // 백그라운드로 전환되지 않으면(=앱이 안 열린 것으로 판단) 웹 로그인
  // 화면(https://liff.line.me/...)으로 자동 전환합니다. 앱이 설치되어
  // 있으면 탭 없이 바로 넘어가고, 없으면 웹으로 자연스럽게 대체됩니다.
  function tryOpenLineApp(customSchemeUrl: string, httpsFallbackUrl: string) {
    let openedApp = false;
    const onVisibilityChange = () => {
      if (document.hidden) openedApp = true;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    window.location.href = customSchemeUrl;

    setTimeout(() => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (!openedApp) {
        window.location.href = httpsFallbackUrl;
      }
    }, 1500);
  }

  async function handleLineConsentConfirm() {
    if (!deepScan) return;
    setLineConnecting(true);
    setLineError(null);
    try {
      const res = await fetch("/api/scan-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deepScan, age: userAge, locale }),
      });
      if (!res.ok) throw new Error("session creation failed");
      const { token } = (await res.json()) as { token: string };
      const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
      const query = `token=${encodeURIComponent(token)}&locale=${encodeURIComponent(locale)}`;
      const httpsUrl = `https://liff.line.me/${liffId}?${query}`;
      const customSchemeUrl = `line://app/${liffId}?${query}`;

      // 수동 "라인 앱에서 열기" 버튼은 안전장치로 계속 보여줍니다
      // (자동 감지가 안 맞는 기기·브라우저 대비).
      setLiffUrl(httpsUrl);
      tryOpenLineApp(customSchemeUrl, httpsUrl);
    } catch {
      setLineError(dict.lineReport.error);
    } finally {
      setLineConnecting(false);
    }
  }

  const needOptionOrder: SkinMetricKey[] = ["elasticity", "pigment", "pore", "wrinkle"];

  return (
    <div className="app-shell gap-6">
      <ProgressBar currentStep={step} labels={dict.scan.stepLabels} />

      {errorMsg && (
        <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMsg}
        </p>
      )}

      {retryNotice && (
        <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-6">
          <div className="rounded-full bg-black/80 px-4 py-2 text-xs font-medium text-white shadow-lg">
            {retryNotice}
          </div>
        </div>
      )}

      {failureChoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="w-full max-w-xs rounded-xl bg-brand-surface p-5 text-center shadow-lg">
            <p className="text-sm font-medium">
              {failureChoice.allowProceed
                ? dict.scan.persistentFailureTitle
                : dict.scan.retakeNeeded}
            </p>
            <p className="mt-2 text-xs text-foreground/70">{failureChoice.reason}</p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleRetake}
                className="min-h-11 w-full rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-brand-primary-fg transition-transform active:scale-[0.98]"
              >
                {dict.scan.retakeButton}
              </button>
              {failureChoice.allowProceed && (
                <button
                  type="button"
                  onClick={handleProceedAnyway}
                  className="min-h-11 w-full rounded-lg border border-brand-border bg-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-transform active:scale-[0.98]"
                >
                  {dict.scan.proceedAnyway}
                </button>
              )}
            </div>
            {failureChoice.allowProceed && (
              <p className="mt-2 text-[11px] text-foreground/40">
                {dict.scan.proceedAnywayHint}
              </p>
            )}
          </div>
        </div>
      )}

      {showLineConsent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="w-full max-w-sm rounded-xl bg-brand-surface p-5 shadow-lg">
            {liffUrl ? (
              <>
                <p className="text-sm font-medium">{dict.lineReport.readyTitle}</p>
                <p className="mt-2 text-xs text-foreground/70">{dict.lineReport.readyBody}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={closeLineConsent}
                    className="flex-1 rounded-lg border border-brand-border bg-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-transform active:scale-[0.98]"
                  >
                    {dict.lineReport.consentCancel}
                  </button>
                  <a
                    href={liffUrl}
                    className="flex-[2] rounded-lg bg-brand-primary px-4 py-2.5 text-center text-sm font-medium text-brand-primary-fg transition-transform active:scale-[0.98]"
                  >
                    {dict.lineReport.openInLine}
                  </a>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-medium">{dict.lineReport.consentTitle}</p>
                <div className="mt-3 flex flex-col gap-2">
                  {dict.lineReport.consentBody.map((line) => (
                    <p key={line} className="text-xs text-foreground/70">
                      {line}
                    </p>
                  ))}
                </div>
                <label className="mt-4 flex items-start gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={lineConsentAgreed}
                    onChange={(e) => setLineConsentAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0"
                  />
                  <span>{dict.lineReport.consentAgree}</span>
                </label>
                {lineError && <p className="mt-2 text-xs text-red-600">{lineError}</p>}
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={closeLineConsent}
                    className="flex-1 rounded-lg border border-brand-border bg-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-transform active:scale-[0.98]"
                  >
                    {dict.lineReport.consentCancel}
                  </button>
                  <button
                    type="button"
                    onClick={handleLineConsentConfirm}
                    disabled={!lineConsentAgreed || lineConnecting}
                    className="flex-[2] rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-brand-primary-fg transition-transform active:scale-[0.98] disabled:opacity-40"
                  >
                    {lineConnecting ? dict.lineReport.connecting : dict.lineReport.consentConfirm}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {step === 1 && (
        <section className="flex min-h-0 flex-1 flex-col gap-3">
          <div className="shrink-0">
            <p className="inline-block rounded-md bg-brand-secondary px-2 py-1 text-xs font-medium text-brand-secondary-fg">
              {dict.scan.step1.badge}
            </p>
            <h1 className="mt-2 text-lg font-medium">{dict.scan.step1.heading}</h1>
            <p className="mt-0.5 text-xs text-foreground/50">
              {dict.scan.step1.hintPrefix}{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {dict.scan.step1.hintAuto}
              </span>
              {dict.scan.step1.hintSuffix}
            </p>
          </div>
          <div className="min-h-0 flex-1">
            <CameraCapture
              key={cameraKey}
              ref={step1Ref}
              guideLabel={dict.scan.step1.guideLabel}
              autoCapture
              onAutoCapture={() => handleStep1Capture()}
              stream={stream}
              streamError={streamError}
              dict={dict}
            />
          </div>
        </section>
      )}

      {step === 2 && faceScan && (
        <section className="flex flex-col gap-5">
          <div>
            <p className="inline-block rounded-md bg-brand-secondary px-2 py-1 text-xs font-medium text-brand-secondary-fg">
              {dict.scan.step2.badge}
            </p>
            <h1 className="mt-2 text-lg font-medium">{dict.scan.step2.heading}</h1>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-black/[.03] p-3 dark:bg-white/[.06]">
              <p className="text-xs text-foreground/60">{dict.scan.step2.toneLabel}</p>
              <p className="mt-1 text-base font-medium">
                {dict.fitzpatrick[faceScan.fitzpatrick].label}
              </p>
            </div>
            <div className="rounded-xl bg-black/[.03] p-3 dark:bg-white/[.06]">
              <p className="text-xs text-foreground/60">{dict.scan.step2.symmetryLabel}</p>
              <p className="mt-1 text-base font-medium">
                {formatScoreOutOf10(faceScan.symmetryScore)}
                {dict.scan.step2.point}
              </p>
            </div>
            <div className="col-span-2 rounded-xl bg-black/[.03] p-3 dark:bg-white/[.06]">
              <p className="text-xs text-foreground/60">{dict.scan.step2.fitzScaleLabel}</p>
              <p className="mt-1 text-xs text-foreground/50">
                {dict.fitzpatrick[faceScan.fitzpatrick].hint} {dict.scan.step2.fitzScaleSuffix}
              </p>
            </div>
            <div className="col-span-2 rounded-xl bg-black/[.03] p-3 dark:bg-white/[.06]">
              <p className="text-xs text-foreground/60">{dict.scan.step2.ageRangeLabel}</p>
              <p className="mt-1 text-base font-medium">{faceScan.estimatedAgeRange}</p>
            </div>
            <div className="col-span-2 rounded-xl bg-black/[.03] p-3 dark:bg-white/[.06]">
              <p className="text-xs text-foreground/60">{dict.scan.step2.undertoneLabel}</p>
              <p className="mt-1 text-base font-medium">
                {dict.undertone[faceScan.undertone].label}
              </p>
              <p className="mt-1 text-xs text-foreground/50">
                {dict.undertone[faceScan.undertone].hint}
              </p>
            </div>
            <div className="col-span-2 rounded-xl bg-black/[.03] p-3 dark:bg-white/[.06]">
              <p className="text-xs text-foreground/60">
                {dict.scan.step2.personalColorLabel}
              </p>
              <p className="mt-1 text-base font-medium">
                {dict.personalColor[faceScan.personalColorSeason].label}
              </p>
              <p className="mt-1 text-xs text-foreground/50">
                {dict.personalColor[faceScan.personalColorSeason].hint}{" "}
                {dict.scan.step2.personalColorSuffix}
              </p>
              <div className="mt-2 flex gap-1.5">
                {dict.personalColor[faceScan.personalColorSeason].palette.map((color) => (
                  <span
                    key={color}
                    className="h-5 w-5 rounded-full border border-black/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-black/[.03] p-3 dark:bg-white/[.06]">
            <label className="text-xs text-foreground/60" htmlFor="user-age">
              {dict.scan.step2.ageInputLabel}
            </label>
            <input
              id="user-age"
              type="number"
              inputMode="numeric"
              min={10}
              max={99}
              placeholder={dict.scan.step2.agePlaceholder}
              value={userAge ?? ""}
              onChange={(e) => setUserAge(e.target.value ? Number(e.target.value) : null)}
              className="mt-1.5 h-9 w-24 rounded-md border border-brand-border bg-transparent px-2 text-sm"
            />
            {userAge === null && (
              <p className="mt-1.5 text-xs text-foreground/40">
                {dict.scan.step2.ageRequired}
              </p>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm text-foreground/60">{dict.scan.step2.needPrompt}</p>
            <div className="flex flex-wrap gap-2">
              {needOptionOrder.map((key) => (
                <NeedChip
                  key={key}
                  label={dict.scan.needOptions[key]}
                  selected={selectedNeed === key}
                  onClick={() => setSelectedNeed(key)}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(3)}
            disabled={!selectedNeed || userAge === null}
            className="min-h-12 w-full rounded-lg bg-brand-primary px-4 py-3 text-sm font-medium text-brand-primary-fg transition-transform active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
          >
            {dict.scan.step2.next}
          </button>
        </section>
      )}

      {step === 3 && selectedNeed && (
        <section className="flex min-h-0 flex-1 flex-col gap-3">
          <div className="shrink-0">
            <p className="inline-block rounded-md bg-brand-secondary px-2 py-1 text-xs font-medium text-brand-secondary-fg">
              {dict.scan.step3.badge}
            </p>
            <h1 className="mt-2 text-lg font-medium">{dict.scan.step3.heading}</h1>
            <p className="mt-0.5 text-xs text-foreground/50">
              {dict.scan.step3.focusPrefix}{" "}
              <span className="font-medium text-foreground/70">
                {dict.scan.focusLabel[selectedNeed]}
              </span>
              {dict.scan.step3.focusSuffix}
            </p>
            <p className="mt-0.5 text-xs text-foreground/50">
              {dict.scan.step3.hintPrefix}{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {dict.scan.step3.hintAuto}
              </span>
              {dict.scan.step3.hintSuffix}
            </p>
          </div>
          <div className="min-h-0 flex-1">
            <CameraCapture
              key={cameraKey}
              ref={step3Ref}
              guideLabel={`${dict.scan.focusLabel[selectedNeed]}${dict.scan.step3.guideLabelSuffix}`}
              autoCapture
              onAutoCapture={() => handleStep3Capture()}
              stream={stream}
              streamError={streamError}
              dict={dict}
            />
          </div>
        </section>
      )}

      {step === 4 && deepScan && (
        <section className="flex flex-col gap-5">
          <div>
            <p className="inline-block rounded-md bg-brand-secondary px-2 py-1 text-xs font-medium text-brand-secondary-fg">
              {dict.scan.step4.badge}
            </p>
            <h1 className="mt-2 text-lg font-medium">
              {dict.scan.step4.headingPrefix}
              {formatScoreOutOf10(deepScan.overallScore)}
              {dict.scan.step4.headingSuffix}{" "}
              <span className="text-sm font-normal text-foreground/50">
                {dict.scan.step4.outOf10}
              </span>
            </h1>
            <p className="mt-1 text-xs text-foreground/50">
              {dict.scan.step4.previewNotice}
            </p>
          </div>

          {(faceScan?.lowConfidence || deepScan.lowConfidence) && (
            <p className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
              {dict.scan.step4.lowConfidence}
            </p>
          )}

          {userAge !== null && (
            <div className="rounded-xl border border-brand-border bg-brand-surface p-3">
              <p className="text-sm font-medium">
                {userAge}
                {dict.scan.step4.percentilePrefix}
                {estimateAgePercentile(deepScan.overallScore, userAge)}
                {dict.scan.step4.percentileSuffix}
              </p>
              <p className="mt-1 text-xs text-foreground/50">
                {dict.scan.step4.percentileDisclaimer}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {deepScan.metrics.map((m) => (
              <div key={m.key} className="rounded-xl bg-black/[.03] p-3 dark:bg-white/[.06]">
                <p className="text-xs text-foreground/60">{m.label}</p>
                <p className="mt-1 text-xl font-medium">{formatScoreOutOf10(m.score)}</p>
              </div>
            ))}
          </div>

          {(() => {
            const sortedMetrics = [...deepScan.metrics].sort((a, b) => a.score - b.score);
            const scenario = buildSolutionScenario(deepScan.metrics, dict.scenario, metricLabels);

            return (
              <>
                <div className="rounded-xl border border-brand-border bg-brand-surface p-3">
                  <p className="text-sm font-medium">{scenario.overallText}</p>
                  {scenario.interactionText && (
                    <p className="mt-1 text-xs text-foreground/60">
                      {scenario.interactionText}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  {sortedMetrics.map((m, i) => {
                    const isWorst = i === 0 && sortedMetrics.length > 1;
                    const isBest = i === sortedMetrics.length - 1 && sortedMetrics.length > 1;
                    return (
                      <div key={m.key} className="rounded-xl border border-brand-border p-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {m.label} · {formatScoreOutOf10(m.score)}
                            {dict.scan.step2.point}
                          </p>
                          {isWorst && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                              {dict.scan.step4.worstBadge}
                            </span>
                          )}
                          {isBest && (
                            <span className="rounded-full bg-brand-secondary px-2 py-0.5 text-xs font-medium text-brand-secondary-fg">
                              {dict.scan.step4.bestBadge}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-foreground/50">
                          {dict.metrics[m.key].description}
                        </p>
                        <p className="mt-2 text-xs text-foreground/70">
                          {scenario.metricTexts[m.key]}
                        </p>
                        <p className="mt-2 text-xs text-foreground/70">
                          <span className="font-semibold text-foreground">
                            {dict.scan.step4.procedureLabel}{" "}
                          </span>
                          {dict.solutions[m.key].procedureInfo}
                        </p>
                        <p className="mt-1 text-xs text-foreground/70">
                          <span className="font-semibold text-foreground">
                            {dict.scan.step4.cosmeticLabel}{" "}
                          </span>
                          {dict.solutions[m.key].cosmeticInfo}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })()}

          <details className="rounded-xl border border-brand-border p-3 text-xs text-foreground/70">
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

          {userAge !== null && userAge < MIN_AGE_FOR_LINE_REPORT ? (
            <p className="text-center text-xs text-foreground/40">
              {dict.lineReport.ageRestricted}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setShowLineConsent(true)}
              className="min-h-12 w-full rounded-lg border border-brand-border bg-transparent px-4 py-3 text-sm font-medium text-foreground transition-transform active:scale-[0.98]"
            >
              {dict.lineReport.cta}
            </button>
          )}

          <p className="text-xs text-foreground/50">{dict.solutionDisclaimer}</p>
        </section>
      )}
    </div>
  );
}
