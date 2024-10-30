import i18n from '@/shared/config/i18n';

const ru = {
    Franc: 'Франция',
    Russia: 'Россия',
    USA: 'США',
    Japan: 'Япония',
    Italy: 'Италия',
};

const en = {
    Franc: 'France',
    Russia: 'Russia',
    USA: 'USA',
    Japan: 'Japan',
    Italy: 'Italy',
};

i18n.addResourceBundle('ru', 'CountrySelect', ru);

i18n.addResourceBundle('en', 'CountrySelect', en);

declare module 'react-i18next' {
    interface CountrySelectResource {
        CountrySelect: ComponentResource<typeof ru>;
    }

    interface AppResources extends CountrySelectResource {}
}
