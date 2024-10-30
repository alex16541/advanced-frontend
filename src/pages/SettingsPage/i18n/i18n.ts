import i18n from '@/shared/config/i18n';

const ru = {
    Settings: 'Настройки',
    'Select design': 'Выберите дизайн',
};

const en = {
    Settings: 'Settings',
    'Select design': 'Select design',
};

i18n.addResourceBundle('ru', 'SettingsPage', ru);

i18n.addResourceBundle('en', 'SettingsPage', en);

declare module 'react-i18next' {
    interface SettingsPageResource {
        SettingsPage: ComponentResource<typeof ru>;
    }

    interface AppResources extends SettingsPageResource {}
}
