import { useContext } from 'react';
import { GlobalContext } from '../providers/globalProvider/context';
import type { GlobalState } from '../providers/globalProvider/types';

const useGlobalState = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  const { state, dispatch } = ctx;
  return {
    // state
    theme: state.theme,
    lang: state.lang,

    // actions (clean API)
    setTheme: (theme: GlobalState['theme']) => dispatch({ type: 'SET_THEME', payload: theme }),

    setLang: (lang: GlobalState['lang']) => dispatch({ type: 'SET_LANG', payload: lang }),
  };
};

export default useGlobalState;
