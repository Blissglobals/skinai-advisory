"use client";

import { useEffect, useState } from "react";

// 분석 크롭이 얼굴 폭 기준이라 해상도가 높을수록 피부 디테일이 남습니다.
// ideal이라 지원하지 않는 기기는 가능한 최대치로 내려갑니다.
export const BASE_VIDEO: MediaTrackConstraints = {
  facingMode: "user",
  width: { ideal: 1280 },
  height: { ideal: 720 },
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function openCamera(video: MediaTrackConstraints): Promise<MediaStream> {
  try {
    return await navigator.mediaDevices.getUserMedia({ video });
  } catch (e) {
    const name = e instanceof DOMException ? e.name : "";
    const facing = video.facingMode as ConstrainDOMStringParameters | undefined;
    // 요구한 카메라(예: 후면)가 없는 기기는 있는 카메라로 대체합니다.
    if (name === "OverconstrainedError" && facing?.exact) {
      return navigator.mediaDevices.getUserMedia({ video: { ...video, facingMode: { ideal: facing.exact } } });
    }
    // 카메라를 바꿀 때 직전 카메라가 아직 해제 중이면 일부 안드로이드에서 실패해서 한 번 더 시도합니다.
    if (name === "NotReadableError" || name === "AbortError") {
      await sleep(400);
      return navigator.mediaDevices.getUserMedia({ video });
    }
    throw e;
  }
}

/** video가 null이면 카메라를 끕니다. 값이 바뀌면 기존 스트림을 끄고 다시 엽니다. */
export function useCameraStream(permissionErrorMessage: string, video: MediaTrackConstraints | null = BASE_VIDEO) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const key = JSON.stringify(video);

  useEffect(() => {
    if (!video) return;
    let cancelled = false;
    let opened: MediaStream | null = null;

    openCamera(video)
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        opened = s;
        setError(null);
        setStream(s);
      })
      .catch(() => {
        if (!cancelled) setError(permissionErrorMessage);
      });

    return () => {
      cancelled = true;
      opened?.getTracks().forEach((t) => t.stop());
      setStream(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { stream, error };
}
