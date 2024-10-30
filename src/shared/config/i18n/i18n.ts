/* eslint-disable max-len */
import { DefaultNS } from '.';

import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const initOptions: InitOptions = {
    fallbackLng: 'ru',
    fallbackNS: 'translation',
    debug: __IS_DEV__,

    interpolation: {
        escapeValue: false,
    },
    ns: ['translation'],
    resources: { ru: { translation: {} }, en: { translation: {} } },
};

i18n.use(LanguageDetector).use(initReactI18next).init(initOptions);

declare module 'react-i18next' {
    type ComponentResource<T> = T & DefaultNS;
    interface Resources extends AppResources {}
}

export default i18n;
