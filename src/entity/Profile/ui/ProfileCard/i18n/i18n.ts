import i18n from '@/shared/config/i18n';

const ru = {
    profile: 'Профиль',
    edit: 'Редактировать',
    age: 'Возраст',
    email: 'Почта',
    'your profile page title': 'Профиль',
    firstname: 'Имя',
    lastname: 'Фамилия',
    Cancel: 'Отмена',
    Save: 'Сохранить',
    city: 'Город',
    country: 'Страна',
    phone: 'Телефон',
    photo: 'Фото',
    'user avatar': 'Аватар пользователя',
    currency: 'Валюта',
    username: 'Логин',
    INCORRECT_USER_DATA: 'Некорректные данные пользователя',
    INCORRECT_AGE: 'Некорректный возраст',
    INCORRECT_EMAIL: 'Некорректная почта',
    PROFILE_ERROR: 'Ошибка профиля',
    INVALID_DATA: 'Неверные данные профиля',
    INVALID_VALIDATION: 'Неверная валидация профиля',
    NO_DATA: 'Нет данных о профиле',
    UNKNOWN_ERROR: 'Неизвестная ошибка',
    SERVER_ERROR: 'Ошибка сервера',
    WRONG_LOGIN_OR_PASSWORD: 'Неверный лигин или пароль',
    UNKNOW_AUTH_ERROR: 'Неизвестная ошибка авторизации',
};

const en = {
    age: 'Age',
    edit: 'Edit',
    email: 'Mail',
    profile: 'Profile',
    'your profile page title': 'Profile',
    firstname: 'Name',
    lastname: 'Lastname',
    Save: 'Save',
    city: 'City',
    country: 'A country',
    phone: 'Telephone',
    Cancel: 'Cancel',
    photo: 'Photo',
    'user avatar': 'User avatar',
    username: 'User name',
    currency: 'Currency',
    INCORRECT_USER_DATA: 'Incorrect user data',
    INCORRECT_AGE: 'Incorrect age',
    INCORRECT_EMAIL: 'Incorrect email',
    PROFILE_ERROR: 'Profile error',
    INVALID_DATA: 'Invalid profile data',
    INVALID_VALIDATION: 'Invalid profile validation',
    NO_DATA: 'No profile data',
    UNKNOWN_ERROR: 'Unknown error',
    SERVER_ERROR: 'Server error',
};

i18n.addResourceBundle('ru', 'ProfileCard', ru);

i18n.addResourceBundle('en', 'ProfileCard', en);

declare module 'react-i18next' {
    interface ProfileCardResource {
        ProfileCard: ComponentResource<typeof ru>;
    }

    interface AppResources extends ProfileCardResource {}
}
