import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en';
import ja from '../locales/ja';
import vi from '../locales/vi';

await i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ja', 'vi'],
    fallbackLng: 'en',
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    detection: {
      order: [
        'querystring',
        'cookie',
        'localStorage',
        'sessionStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
      ],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupQuerystring: 'lng',
    },
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      ja: {
        translation: ja,
      },
      vi: {
        translation: vi,
      },
    },
  });

export default i18n;
