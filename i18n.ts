import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uz: {
    translation: {
      welcome: "Xush kelibsiz",
      language: "Til"
    }
  },
  ru: {
    translation: {
      welcome: "Добро пожаловать",
      language: "Язык"
    }
  },
  en: {
    translation: {
      welcome: "Welcome",
      language: "Language"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uz',
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;