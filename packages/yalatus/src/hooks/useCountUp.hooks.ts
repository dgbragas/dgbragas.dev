import { useEffect, useState } from 'react';

export type UseCountUpOptions = {
  /** Number the counter ends at. */
  to: number;
  /** Length of the animation in milliseconds; `0` jumps straight to the end. */
  duration: number;
  /**
   * Starts the animation; while `false` the counter stays at zero.
   * @default true
   */
  enabled?: boolean;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates a number from zero to a target with an ease-out curve on `requestAnimationFrame`.
 * @param options - Target, duration and whether the animation is enabled
 * @returns The current value of the counter, ending exactly at `to`
 * @example
 * const value = useCountUp({ to: 92, duration: 1200, enabled: inView });
 */
export function useCountUp({ to, duration, enabled = true }: UseCountUpOptions): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return undefined;
    if (duration <= 0) {
      setValue(to);
      return undefined;
    }

    let frame = 0;
    let start: number | undefined;

    const tick = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / duration, 1);
      setValue(to * easeOutCubic(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, enabled, to]);

  return value;
}
