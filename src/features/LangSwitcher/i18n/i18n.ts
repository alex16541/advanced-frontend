import i18n from '@/shared/config/i18n';

const ru = {
    lang: 'En',
};

const en = {
    lang: 'Ру',
};

i18n.addResourceBundle('ru', 'LangSwitcher', ru);

i18n.addResourceBundle('en', 'LangSwitcher', en);

declare module 'react-i18next' {
    interface LangSwitcherResource {
        LangSwitcher: ComponentResource<typeof ru>;
    }

    interface AppResources extends LangSwitcherResource {}
}
