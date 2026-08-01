"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  getFaceLandmarker,
  tryDetectLandmarksForVideoFrame,
  computeFaceAlignment,
} from "@/lib/analysis/landmarks";
import {
  analyzeFrameLighting,
  applyWhiteBalance,
  describeLighting,
  getLightingStatus,
  NEUTRAL_GAINS,
  type WhiteBalanceGains,
} from "@/lib/whiteBalance";
import { playShutterClick } from "@/lib/shutterSound";
import type { Dictionary } from "@/i18n/getDictionary";

export interface CameraCaptureHandle {
  getVideoElement: () => HTMLVideoElement | null;
  isReady: () => boolean;
  getWhiteBalanceGains: () => WhiteBalanceGains;
  triggerCaptureEffect: () => void;
}

export type CalibrationPhase = "adjust" | "instruction" | "ready";

interface CameraCaptureProps {
  guideLabel: string;
  autoCapture?: boolean;
  onAutoCapture?: () => void;
  onPhaseChange?: (phase: CalibrationPhase) => void;
  stream: MediaStream | null;
  streamError?: string | null;
  dict: Dictionary;
}

const HOLD_SECONDS = 3;
const POLL_INTERVAL_MS = 150;
const CALIBRATION_INTERVAL_MS = 300;
const INSTRUCTION_SECONDS = 3;
const ALIGNED_GUIDE_COLOR = "#BFE8B0";
const FLASH_DURATION_MS = 350;
export const FREEZE_HOLD_MS = 1000;

// 조명이 "적절함" 상태에 끝내 도달하지 못해도, 이 시간이 지나면
// 그대로 다음 단계로 진행합니다(사용자가 무한정 대기하지 않도록).
// 이후 실제 촬영 분석 단계의 품질 검사가 lowConfidence 여부를 판단합니다.
const ADJUST_TIMEOUT_MS = 9000;

const CameraCapture = forwardRef<CameraCaptureHandle, CameraCaptureProps>(
  function CameraCapture(
    {
      guideLabel,
      autoCapture = false,
      onAutoCapture,
      onPhaseChange,
      stream,
      streamError,
      dict,
    },
    ref
  ) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const filterRef = useRef<SVGFEColorMatrixElement>(null);
    const autoGainsRef = useRef<WhiteBalanceGains>(NEUTRAL_GAINS);
    const phaseRef = useRef<CalibrationPhase>("adjust");
    const adjustStartRef = useRef<number>(performance.now());
    const filterId = useId();

    const [brightness, setBrightness] = useState<"good" | "low" | "measuring">(
      "measuring"
    );
    const [aligned, setAligned] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [flash, setFlash] = useState(false);
    const [freezeFrameUrl, setFreezeFrameUrl] = useState<string | null>(null);

    const [phase, setPhase] = useState<CalibrationPhase>("adjust");
    const [calibrationHint, setCalibrationHint] = useState(
      dict.camera.calibrationHintDefault
    );
    const [instructionCountdown, setInstructionCountdown] =
      useState(INSTRUCTION_SECONDS);

    const onAutoCaptureRef = useRef(onAutoCapture);
    onAutoCaptureRef.current = onAutoCapture;
    const onPhaseChangeRef = useRef(onPhaseChange);
    onPhaseChangeRef.current = onPhaseChange;

    const brightnessWordMap = {
      good: dict.camera.brightnessGood,
      low: dict.camera.brightnessLow,
      measuring: dict.camera.brightnessMeasuring,
    };

    useEffect(() => {
      phaseRef.current = phase;
      onPhaseChangeRef.current?.(phase);
    }, [phase]);

    function computeFinalGains(): WhiteBalanceGains {
      return autoGainsRef.current;
    }

    function updateFilterPreview() {
      if (!filterRef.current) return;
      const { r, g, b } = computeFinalGains();
      filterRef.current.setAttribute(
        "values",
        `${r} 0 0 0 0  0 ${g} 0 0 0  0 0 ${b} 0 0  0 0 0 1 0`
      );
    }

    function runCaptureEffect() {
      const video = videoRef.current;
      if (video && video.videoWidth > 0) {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
          applyWhiteBalance(frame, computeFinalGains());
          ctx.putImageData(frame, 0, 0);
          setFreezeFrameUrl(canvas.toDataURL("image/jpeg", 0.85));
        }
      }
      setFlash(true);
      playShutterClick();
      setTimeout(() => setFlash(false), FLASH_DURATION_MS);
    }

    useImperativeHandle(ref, () => ({
      getVideoElement: () => videoRef.current,
      isReady: () =>
        !!videoRef.current &&
        videoRef.current.videoWidth > 0 &&
        videoRef.current.videoHeight > 0,
      getWhiteBalanceGains: computeFinalGains,
      triggerCaptureEffect: runCaptureEffect,
    }));

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }, [stream]);

    useEffect(() => {
      const interval = setInterval(() => {
        const video = videoRef.current;
        if (!video || video.videoWidth === 0) return;
        const canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, 32, 32);
        const data = ctx.getImageData(0, 0, 32, 32).data;
        let total = 0;
        for (let i = 0; i < data.length; i += 4) {
          total += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        }
        const avg = total / (data.length / 4);
        setBrightness(avg < 70 ? "low" : "good");
      }, 500);
      return () => clearInterval(interval);
    }, []);

    // 밝기·색편차를 지속적으로 측정해 자동 화이트밸런스 값을 갱신합니다.
    // 조명이 "적절함" 상태가 되거나 타임아웃에 도달하면 사용자 조작 없이
    // 자동으로 다음 단계(안내 카운트다운)로 넘어갑니다.
    useEffect(() => {
      let cancelled = false;

      const interval = setInterval(() => {
        if (cancelled || phaseRef.current !== "adjust") return;
        const video = videoRef.current;
        if (!video || video.videoWidth === 0) return;
        const canvas = document.createElement("canvas");
        canvas.width = 24;
        canvas.height = 24;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, 24, 24);
        const frame = ctx.getImageData(0, 0, 24, 24);
        const analysis = analyzeFrameLighting(frame);
        autoGainsRef.current = analysis.gains;
        updateFilterPreview();
        setCalibrationHint(describeLighting(analysis, dict.lighting));

        const isGood = getLightingStatus(analysis) === "good";
        const timedOut = performance.now() - adjustStartRef.current >= ADJUST_TIMEOUT_MS;
        if (isGood || timedOut) {
          setPhase("instruction");
        }
      }, CALIBRATION_INTERVAL_MS);

      return () => {
        cancelled = true;
        clearInterval(interval);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dict.lighting]);

    useEffect(() => {
      if (phase !== "instruction") return;
      setInstructionCountdown(INSTRUCTION_SECONDS);
      const tick = setInterval(() => {
        setInstructionCountdown((c) => Math.max(1, c - 1));
      }, 1000);
      const timeout = setTimeout(() => {
        setPhase("ready");
      }, INSTRUCTION_SECONDS * 1000);
      return () => {
        clearInterval(tick);
        clearTimeout(timeout);
      };
    }, [phase]);

    useEffect(() => {
      if (!autoCapture || phase !== "ready") return;

      let cancelled = false;
      let processing = false;
      let alignedSinceMs: number | null = null;
      let fired = false;

      const interval = setInterval(async () => {
        if (cancelled || fired || processing) return;
        const video = videoRef.current;
        if (!video) return;
        processing = true;
        try {
          const landmarker = await getFaceLandmarker();
          if (cancelled || fired) return;
          const landmarks = tryDetectLandmarksForVideoFrame(
            landmarker,
            video,
            performance.now()
          );
          const isAligned = landmarks
            ? computeFaceAlignment(landmarks)
            : false;

          setAligned(isAligned);

          if (isAligned) {
            if (alignedSinceMs === null) alignedSinceMs = performance.now();
            const elapsedMs = performance.now() - alignedSinceMs;
            if (elapsedMs >= HOLD_SECONDS * 1000) {
              fired = true;
              setCountdown(null);
              runCaptureEffect();
              setTimeout(() => {
                onAutoCaptureRef.current?.();
              }, FREEZE_HOLD_MS);
            } else {
              const remaining =
                HOLD_SECONDS - Math.floor(elapsedMs / 1000);
              setCountdown(Math.max(1, Math.min(HOLD_SECONDS, remaining)));
            }
          } else {
            alignedSinceMs = null;
            setCountdown(null);
          }
        } catch {
          // 얼굴 인식이 일시적으로 실패해도 폴링은 계속 유지합니다.
        } finally {
          processing = false;
        }
      }, POLL_INTERVAL_MS);

      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }, [autoCapture, phase]);

    const guideColor = aligned ? ALIGNED_GUIDE_COLOR : "white";

    return (
      <div className="flex h-full w-full min-h-40 flex-col overflow-hidden rounded-2xl bg-black">
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <filter id={filterId}>
              <feColorMatrix
                ref={filterRef}
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
              />
            </filter>
          </defs>
        </svg>

        <div className="relative min-h-0 flex-1">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover [transform:scaleX(-1)]"
            style={{ filter: `url(#${filterId})` }}
          />
          {freezeFrameUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={freezeFrameUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          {phase === "instruction" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/75 p-6 text-center">
              <p className="text-base font-medium text-white">
                {instructionCountdown}
                {dict.camera.instructionCountdownSuffix}
              </p>
              <p className="text-sm text-white/80">{dict.camera.instructionHint}</p>
            </div>
          )}

          {phase === "ready" && (
            <>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 260" className="h-4/5">
                  <ellipse
                    cx="100"
                    cy="130"
                    rx="70"
                    ry="100"
                    fill="none"
                    stroke={guideColor}
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    opacity="0.9"
                    style={{ transition: "stroke 150ms ease" }}
                  />
                </svg>
              </div>
              <div className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
                {aligned && autoCapture ? dict.camera.alignedLabel : guideLabel}
              </div>
              {countdown !== null && (
                <div className="absolute right-4 top-3 text-3xl font-bold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
                  {countdown}
                </div>
              )}
            </>
          )}

          <div className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
            {dict.camera.lightingLabel} {brightnessWordMap[brightness]}
          </div>
          {flash && (
            <div className="pointer-events-none absolute inset-0 bg-white camera-flash" />
          )}
          {streamError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4 text-center text-sm text-white">
              {streamError}
            </div>
          )}
        </div>

        {phase === "adjust" && (
          <div className="flex shrink-0 items-center justify-center bg-black/85 px-4 py-3">
            <p className="text-center text-xs text-white/70">{calibrationHint}</p>
          </div>
        )}
      </div>
    );
  }
);

export default CameraCapture;
