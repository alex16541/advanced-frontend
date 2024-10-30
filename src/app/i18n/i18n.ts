/* eslint-disable max-len */
import i18n, { translation } from '@/shared/config/i18n';

i18n.addResourceBundle('ru', 'translation', translation.ru);

i18n.addResourceBundle('en', 'translation', translation.en);

declare module 'react-i18next' {
    interface TranslationResource {
        translation: typeof translation.ru;
    }

    interface AppResources extends TranslationResource {}
}
