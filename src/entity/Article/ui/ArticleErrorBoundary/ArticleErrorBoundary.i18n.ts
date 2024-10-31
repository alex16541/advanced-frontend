import i18n from '@/shared/config/i18n';

const ru = {
    NO_DATA: 'Нет данных',
    ARTICLE_CREATE_ERROR: 'Произошла ошибка при создании статьи',
    UNKNOWN_ERROR: 'Неизвестная ошибка',
    SERVER_ERROR: 'Ошибка сервера',
    INVALID_DATA: 'Некорректные данные',
    INVALID_VALIDATION: 'Некорректная валидация',
    FORBIDDEN: 'У вас недостаточно прав для редактирования этой статьи',
    NOT_FOUND: 'Страница не найдена',
};

const en = {
    NO_DATA: 'No data',
    ARTICLE_CREATE_ERROR: 'Article create error',
    UNKNOWN_ERROR: 'Unknown error',
    SERVER_ERROR: 'Server error',
    INVALID_DATA: 'Invalid data',
    INVALID_VALIDATION: 'Invalid validation',
    FORBIDDEN: 'You do not have permission to edit this article',
    NOT_FOUND: 'Page not found',
};

i18n.addResourceBundle('ru', 'ArticleErrorBoundary', ru);

i18n.addResourceBundle('en', 'ArticleErrorBoundary', en);

declare module 'react-i18next' {
    interface ArticleErrorBoundaryResource {
        ArticleErrorBoundary: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticleErrorBoundaryResource {}
}
