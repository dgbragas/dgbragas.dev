import Lenis from 'lenis';

let instance: Lenis | undefined;

/**
 * Starts Lenis once per browser session and keeps it alive across client-side navigations; people who prefer reduced motion keep the native scroll.
 * @returns The running instance, or undefined when motion is reduced
 */
export function startSmoothScroll(): Lenis | undefined {
  if (instance) return instance;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

  instance = new Lenis({ autoRaf: true, duration: 0.8, wheelMultiplier: 1.1 });
  document.addEventListener('astro:after-swap', () => instance?.scrollTo(0, { immediate: true }));
  return instance;
}
