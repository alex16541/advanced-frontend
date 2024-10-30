import i18n, { DefaultNS } from '@/shared/config/i18n';

const ru = {
    'main page title': 'Главная',
    'about page title': 'О нас',
    'your profile page title': ' Ваш профиль',
    articles: 'Статьи',
};

const en = {
    'main page title': 'Main',
    'about page title': 'About us',
    'your profile page title': 'Your profile',
    articles: 'Articles',
};

i18n.addResourceBundle('ru', 'Sidebar', ru);

i18n.addResourceBundle('en', 'Sidebar', en);

export type i18nSidebarKeys = keyof typeof ru & keyof DefaultNS;

declare module 'react-i18next' {
    interface SidebarResource {
        Sidebar: ComponentResource<typeof ru>;
    }

    interface AppResources extends SidebarResource {}
}
