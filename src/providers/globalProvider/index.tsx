import { useEffect, useReducer } from 'react';
import { loadState, saveState } from '../../helpers/storageHelper';
import i18n from '../../plugins/i18n';
import { GlobalContext } from './context';
import type { GlobalAction, GlobalState } from './types';

const STORAGE_KEY = 'app:global';
const supportedLangs = ['en', 'ja', 'vi'] as const;

type SupportedLang = (typeof supportedLangs)[number];

const normalizeLang = (lang?: string): SupportedLang => {
  if (!lang) {
    return 'en';
  }

  const normalized = lang.split('-')[0];
  return supportedLangs.includes(normalized as SupportedLang)
    ? (normalized as SupportedLang)
    : 'en';
};

const persisted = loadState<GlobalState>(STORAGE_KEY);

const initialState: GlobalState = {
  theme: persisted?.theme ?? 'system',
  lang: normalizeLang(persisted?.lang ?? i18n.resolvedLanguage ?? i18n.language),
};

const reducer = (state: GlobalState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_LANG':
      return { ...state, lang: action.payload };

    default:
      return state;
  }
};

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    saveState(STORAGE_KEY, state);
  }, [state]);

  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
