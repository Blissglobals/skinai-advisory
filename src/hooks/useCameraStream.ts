"use client";

import { useEffect, useRef, useState } from "react";

export function useCameraStream(permissionErrorMessage: string) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia({
        // 분석 크롭이 얼굴 폭 기준이라 해상도가 높을수록 피부 디테일이 남습니다.
        // ideal이라 지원하지 않는 기기는 가능한 최대치로 내려갑니다.
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = s;
        setStream(s);
      })
      .catch(() => setError(permissionErrorMessage));

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stream, error };
}
