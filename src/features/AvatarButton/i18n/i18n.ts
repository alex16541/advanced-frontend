import i18n from '@/shared/config/i18n';

const ru = {
    Profile: 'Профиль',
    Settings: 'Настройки',
    Admin: 'Админка',
    Logout: 'Выйти',
};

const en = {
    Profile: 'Profile',
    Settings: 'Settings',
    Admin: 'Admin',
    Logout: 'Logout',
};

i18n.addResourceBundle('ru', 'AvatarButton', ru);

i18n.addResourceBundle('en', 'AvatarButton', en);

declare module 'react-i18next' {
    interface AvatarButtonResource {
        AvatarButton: ComponentResource<typeof ru>;
    }

    interface AppResources extends AvatarButtonResource {}
}
