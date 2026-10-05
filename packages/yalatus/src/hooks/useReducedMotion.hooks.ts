import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/**
 * Tells whether the person asked the system for reduced motion, updating when the preference changes.
 * @returns `true` when motion must be reduced; `false` on the server and when the preference is off
 * @example
 * const reduced = useReducedMotion();
 * const duration = reduced ? 0 : COUNT_UP_DURATION;
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
