import type { GlobalState } from '../providers/globalProvider/types';

export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const resolveTheme = (theme: GlobalState['theme']): 'light' | 'dark' => {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
};
