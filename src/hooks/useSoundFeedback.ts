import { useCallback, useRef } from "react";
import { useLearnStore } from "@/store/useLearnStore";

type SoundType = "success" | "error" | "click";

export function useSoundFeedback() {
  const ctxRef = useRef<AudioContext | null>(null);
  const soundEnabled = useLearnStore((s) => s.soundEnabled);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number, duration: number, type: OscillatorType = "sine", volume = 0.15) => {
      if (!soundEnabled) return;
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // AudioContext not available
      }
    },
    [getCtx, soundEnabled]
  );

  const play = useCallback(
    (sound: SoundType) => {
      switch (sound) {
        case "success":
          playTone(523.25, 0.1, "sine", 0.12);
          setTimeout(() => playTone(659.25, 0.15, "sine", 0.12), 80);
          break;
        case "error":
          playTone(196, 0.15, "sawtooth", 0.08);
          setTimeout(() => playTone(146.83, 0.2, "sawtooth", 0.08), 100);
          break;
        case "click":
          playTone(800, 0.03, "square", 0.04);
          break;
      }
    },
    [playTone]
  );

  return { play };
}
