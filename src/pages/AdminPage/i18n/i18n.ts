import i18n from '@/shared/config/i18n';

const ru = {
    title: 'Админка',
};

const en = {
    title: 'Admin page',
};

i18n.addResourceBundle('ru', 'AdminPage', ru);

i18n.addResourceBundle('en', 'AdminPage', en);

declare module 'react-i18next' {
    interface AdminPageResource {
        AdminPage: ComponentResource<typeof ru>;
    }

    interface AppResources extends AdminPageResource {}
}
