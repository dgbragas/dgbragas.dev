type ThrottleOptions = {
  /**
   * Se `true`, a função será executada imediatamente na primeira chamada.
   * Default: true.
   */
  leading?: boolean;
  /**
   * Se `true`, garante que a função seja executada novamente após o período
   * de atraso.
   * Default: true.
   */
  trailing?: boolean;
};

function throttle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
  options: ThrottleOptions = {},
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastCallTime = 0;
  const { leading = true, trailing = true } = options;

  return function throttleFunction(...args: Parameters<T>): void {
    const now = Date.now();

    if (lastCallTime === 0 && !leading) lastCallTime = now;

    const remaining = delay - (now - lastCallTime);
    lastArgs = args;

    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      lastCallTime = now;
      callback(...args);
      lastArgs = null;
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        lastCallTime = leading ? Date.now() : 0;
        timer = null;

        if (lastArgs) {
          callback(...lastArgs);
          lastArgs = null;
        }
      }, remaining);
    }
  };
}

export { throttle };
