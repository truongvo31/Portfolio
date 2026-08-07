import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useGlobalState from './useGlobalState';

export function HtmlLangSync() {
  const { lang } = useGlobalState();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = lang;
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return null;
}
