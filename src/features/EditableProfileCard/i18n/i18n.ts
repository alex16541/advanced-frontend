import i18n from '@/shared/config/i18n';

const ru = {
    profile: 'Профиль',
    Edit: 'Редактировать',
    Cancel: 'Отмена',
    Save: 'Сохранить',

    INCORRECT_USER_DATA: 'Некорректные данные пользователя',
    INCORRECT_AGE: 'Некорректный возраст',
    INCORRECT_EMAIL: 'Некорректная почта',
    PROFILE_ERROR: 'Ошибка профиля',
    INVALID_DATA: 'Неверные данные профиля',
    INVALID_VALIDATION: 'Неверная валидация профиля',
    NO_DATA: 'Нет данных о профиле',
    UNKNOWN_ERROR: 'Неизвестная ошибка',
    SERVER_ERROR: 'Ошибка сервера',
    FORBIDDEN: 'У вас недостаточно прав для редактирования этого профиля',
    NOT_FOUND: 'Страница не найдена',
};

const en = {
    profile: 'Profile',
    Edit: 'Edit',
    Cancel: 'Cancel',
    Save: 'Save',

    INCORRECT_USER_DATA: 'Incorrect user data',
    INCORRECT_AGE: 'Incorrect age',
    INCORRECT_EMAIL: 'Incorrect email',
    PROFILE_ERROR: 'Profile error',
    INVALID_DATA: 'Invalid profile data',
    INVALID_VALIDATION: 'Invalid profile validation',
    NO_DATA: 'No profile data',
    UNKNOWN_ERROR: 'Unknown error',
    SERVER_ERROR: 'Server error',
    FORBIDDEN: 'You do not have permission to edit this profile',
    NOT_FOUND: 'Page not found',
};

i18n.addResourceBundle('ru', 'EditableProfileCard', ru);

i18n.addResourceBundle('en', 'EditableProfileCard', en);

declare module 'react-i18next' {
    interface EditableProfileCardResource {
        EditableProfileCard: ComponentResource<typeof ru>;
    }

    interface AppResources extends EditableProfileCardResource {}
}
