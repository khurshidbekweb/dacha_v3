import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import translationRu from '../public/locales/ru.json';
import translationUz from '../public/locales/uz.json';
import { safeLocalStorage } from '@/utils/safeLocalstorge';

const resources = {
    ru: { translation: translationRu },
    uz: { translation: translationUz },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: safeLocalStorage.getItem('language') || 'uz', // default til
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
