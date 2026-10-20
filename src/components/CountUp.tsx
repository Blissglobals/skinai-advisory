"use client";

import { useLayoutEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  format: (value: number) => string;
  delayMs?: number;
  durationMs?: number;
}

// 매 프레임 React 상태를 바꾸면 결과 화면 전체가 리렌더되므로,
// 숫자 텍스트만 ref로 직접 갱신합니다. 첫 페인트 전에 0으로 맞추려고 layout effect를 씁니다.
export default function CountUp({ value, format, delayMs = 0, durationMs = 1100 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.textContent = format(0);
    const start = performance.now() + delayMs;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / durationMs));
      // CSS의 --ease-out-expo와 같은 곡선이어야 링·막대와 숫자가 함께 멈춥니다.
      el.textContent = format(value * (t === 1 ? 1 : 1 - 2 ** (-10 * t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.textContent = format(value);
    };
  }, [value, format, delayMs, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(value)}
    </span>
  );
}
