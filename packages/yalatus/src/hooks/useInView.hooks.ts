import { useEffect, useState, type RefObject } from 'react';

export type UseInViewOptions = {
  /**
   * Fraction of the element that must be visible before it counts as in view.
   * @default 0.2
   */
  threshold?: number;
  /**
   * Keeps the result `true` after the first time the element enters the viewport.
   * @default true
   */
  once?: boolean;
};

/**
 * Tracks whether an element is inside the viewport.
 * @param ref - Ref of the element to observe
 * @param options - Visibility threshold and whether the first entry sticks
 * @returns `true` while the element is visible; also `true` when the browser has no IntersectionObserver, so content is never hidden
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const inView = useInView(ref);
 */
export function useInView(
  ref: RefObject<Element | null>,
  { once = true, threshold = 0.2 }: UseInViewOptions = {}
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.some(entry => entry.isIntersecting);
        if (visible) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [once, ref, threshold]);

  return inView;
}
