import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useCountUp } from '../useCountUp.hooks';

describe('useCountUp.hooks.ts', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('useCountUp()', () => {
    describe('when disabled', () => {
      it('should stay at zero', () => {
        const { result } = renderHook(() =>
          useCountUp({ to: 100, duration: 1000, enabled: false })
        );

        act(() => {
          vi.advanceTimersByTime(2000);
        });

        expect(result.current).toBe(0);
      });
    });

    describe('when the duration is zero', () => {
      it('should jump to the target', () => {
        const { result } = renderHook(() => useCountUp({ to: 42, duration: 0 }));

        expect(result.current).toBe(42);
      });
    });

    describe('when animating', () => {
      it('should ease towards the target and end exactly on it', () => {
        const { result } = renderHook(() => useCountUp({ to: 100, duration: 1000 }));

        act(() => {
          vi.advanceTimersByTime(500);
        });
        expect(result.current).toBeGreaterThan(0);
        expect(result.current).toBeLessThan(100);

        act(() => {
          vi.advanceTimersByTime(1000);
        });
        expect(result.current).toBe(100);
      });

      it('should cancel the pending frame on unmount', () => {
        const cancel = vi.spyOn(globalThis, 'cancelAnimationFrame');
        const { unmount } = renderHook(() => useCountUp({ to: 100, duration: 1000 }));

        unmount();

        expect(cancel).toHaveBeenCalled();
      });
    });
  });
});
