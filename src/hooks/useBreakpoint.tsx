import * as React from 'react';

const breakpoints = {
  small: 420,
  medium: 768,
  large: 1280,
};

const getBreakpoint = (width: number): keyof typeof breakpoints => {
  if (width >= breakpoints.large) return 'large';
  if (width > breakpoints.medium && width < breakpoints.large) return 'medium';
  return 'small';
};

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState(() =>
    typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'large',
  );

  React.useEffect(() => {
    if (typeof window === undefined) return;

    const updateBreakpoint = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}

export { useBreakpoint };
