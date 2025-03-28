import * as React from 'react';

import Lenis from '@studio-freight/lenis';

function SmoothScroll() {
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      // easeOutExpo. Ref.: https://easings.net/pt-br#easeOutExpo
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    document.querySelectorAll('a[href^="#"').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector<HTMLElement>(
          anchor.getAttribute('href') as string,
        );
        if (target) {
          lenis.scrollTo(target);
        }
      });
    });

    return () => {};
  }, []);

  return null;
}

export { SmoothScroll };
