import { useEffect, useState } from 'react';

export function useBreakpoints() {
  const getBreakpoints = () => ({
    sm: window.matchMedia('(min-width: 640px)').matches,
    md: window.matchMedia('(min-width: 768px)').matches,
    lg: window.matchMedia('(min-width: 1024px)').matches,
    xl: window.matchMedia('(min-width: 1280px)').matches,
    '2xl': window.matchMedia('(min-width: 1536px)').matches,
  });

  const [breakpoints, setBreakpoints] = useState(() =>
    typeof window === 'undefined'
      ? {
          sm: false,
          md: false,
          lg: false,
          xl: false,
          '2xl': false,
        }
      : getBreakpoints(),
  );

  useEffect(() => {
    const update = () => setBreakpoints(getBreakpoints());

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  return breakpoints;
}
