// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';

const scrollTo = vi.fn();
const LenisMock = vi.fn(function Lenis() {
  return { scrollTo };
});

vi.mock('lenis', () => ({ default: LenisMock }));

const mockMotion = (reduced: boolean) => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: reduced });
};

describe('smoothScroll.ts', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  describe('startSmoothScroll()', () => {
    describe('when motion is not reduced', () => {
      it('should create one instance, reuse it and reset the scroll after a navigation', async () => {
        mockMotion(false);
        const { startSmoothScroll } = await import('../smoothScroll');

        const first = startSmoothScroll();
        const second = startSmoothScroll();

        expect(LenisMock).toHaveBeenCalledTimes(1);
        expect(second).toBe(first);

        document.dispatchEvent(new Event('astro:after-swap'));
        expect(scrollTo).toHaveBeenCalledWith(0, { immediate: true });
      });
    });

    describe('when motion is reduced', () => {
      it('should keep the native scroll', async () => {
        mockMotion(true);
        const { startSmoothScroll } = await import('../smoothScroll');

        expect(startSmoothScroll()).toBeUndefined();
        expect(LenisMock).not.toHaveBeenCalled();
      });
    });
  });
});
