import { useEffect, useState } from 'react';
import { getSystemTheme } from '../helpers/themeHelper';

export function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState(getSystemTheme());

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const listener = () => {
      setSystemTheme(getSystemTheme());
    };

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, []);

  return systemTheme;
}
