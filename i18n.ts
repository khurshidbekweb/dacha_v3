import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonUz from './public/locales/uz/common.json';
import commonRu from './public/locales/ru/common.json';
import commonEn from './public/locales/en/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: {
        common: commonUz,
      },
      ru: {
        common: commonRu,
      },
      en: {
        common: commonEn,
      },
    },
    lng: 'uz',
    fallbackLng: 'uz',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;