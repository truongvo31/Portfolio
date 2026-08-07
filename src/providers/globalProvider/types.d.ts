export type GlobalState = {
  theme: 'light' | 'dark' | 'system';
  lang: 'en' | 'ja' | 'vi';
};

export type GlobalAction =
  | { type: 'SET_THEME'; payload: GlobalState['theme'] }
  | { type: 'SET_LANG'; payload: GlobalState['lang'] };
