import * as React from 'react';

import { breakpoints } from '@/constants';
import { throttle } from '@/utils';

type UseBreakpointProps = {
  initialWidth: number;
};

const getBreakpoint = (width: number): keyof typeof breakpoints => {
  if (width >= breakpoints.large) return 'large';
  if (width >= breakpoints.medium) return 'medium';
  return 'small';
};

function useBreakpoint({ initialWidth }: UseBreakpointProps) {
  const [breakpoint, setBreakpoint] = React.useState(() =>
    typeof window !== 'undefined'
      ? getBreakpoint(window.innerWidth)
      : getBreakpoint(initialWidth),
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateBreakpoint = throttle(() => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    }, 200);

    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}

export { useBreakpoint };
