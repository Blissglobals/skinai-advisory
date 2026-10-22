let sharedContext: AudioContext | null = null;

export function playShutterClick(): void {
  try {
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextCtor) return;
    if (!sharedContext) sharedContext = new AudioContextCtor();
    const ctx = sharedContext;
    if (ctx.state === "suspended") void ctx.resume();

    const now = ctx.currentTime;
    const duration = 0.07;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 2200;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  } catch {
    // Web Audio를 지원하지 않는 환경에서는 조용히 무시합니다.
  }
}

/** 짧은 삐 소리(카운트다운용). 화면을 볼 수 없는 거울 촬영에서 타이밍을 알려줍니다. */
export function playBeep(frequency: number = 880): void {
  try {
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;
    if (!sharedContext) sharedContext = new AudioContextCtor();
    const ctx = sharedContext;
    if (ctx.state === "suspended") void ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } catch {
    // Web Audio를 지원하지 않는 환경에서는 조용히 무시합니다.
  }
}
