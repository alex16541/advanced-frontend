import i18n from '@/shared/config/i18n';

const ru = {
    title: 'Обо мне',
};

const en = {
    title: 'About me',
};

i18n.addResourceBundle('ru', 'AboutPage', ru);

i18n.addResourceBundle('en', 'AboutPage', en);

declare module 'react-i18next' {
    interface AboutPageResource {
        AboutPage: ComponentResource<typeof ru>;
    }

    interface AppResources extends AboutPageResource {}
}
