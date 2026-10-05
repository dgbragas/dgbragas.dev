import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useInView } from '../useInView.hooks';

type Callback = (entries: { isIntersecting: boolean }[]) => void;

describe('useInView.hooks.ts', () => {
  let callback: Callback | undefined;
  const observe = vi.fn();
  const disconnect = vi.fn();

  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe = observe;
        disconnect = disconnect;
        constructor(cb: Callback) {
          callback = cb;
        }
      }
    );
  });

  afterEach(() => {
    callback = undefined;
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  describe('useInView()', () => {
    describe('when the ref has no element', () => {
      it('should stay false without observing', () => {
        const { result } = renderHook(() => useInView({ current: null }));

        expect(result.current).toBe(false);
        expect(observe).not.toHaveBeenCalled();
      });
    });

    describe('when the element enters the viewport', () => {
      it('should become true and disconnect because once is the default', () => {
        const ref = { current: document.createElement('div') };
        const { result } = renderHook(() => useInView(ref));

        act(() => callback?.([{ isIntersecting: true }]));

        expect(result.current).toBe(true);
        expect(disconnect).toHaveBeenCalledTimes(1);
      });

      it('should follow visibility in both directions when once is false', () => {
        const ref = { current: document.createElement('div') };
        const { result } = renderHook(() => useInView(ref, { once: false, threshold: 0.5 }));

        act(() => callback?.([{ isIntersecting: true }]));
        expect(result.current).toBe(true);

        act(() => callback?.([{ isIntersecting: false }]));
        expect(result.current).toBe(false);
        expect(disconnect).not.toHaveBeenCalled();
      });

      it('should ignore a non-intersecting entry while once is true', () => {
        const ref = { current: document.createElement('div') };
        const { result } = renderHook(() => useInView(ref));

        act(() => callback?.([{ isIntersecting: false }]));

        expect(result.current).toBe(false);
      });
    });

    describe('when the hook unmounts', () => {
      it('should disconnect the observer', () => {
        const ref = { current: document.createElement('div') };
        const { unmount } = renderHook(() => useInView(ref));

        unmount();

        expect(disconnect).toHaveBeenCalledTimes(1);
      });
    });

    describe('when IntersectionObserver is unavailable', () => {
      it('should report the element as visible', () => {
        vi.stubGlobal('IntersectionObserver', undefined);
        const ref = { current: document.createElement('div') };
        const { result } = renderHook(() => useInView(ref));

        expect(result.current).toBe(true);
      });
    });
  });
});
