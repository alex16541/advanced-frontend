import i18n from '@/shared/config/i18n';

const ru = {
    ARTICLE_CREATE_ERROR: 'Произошла ошибка при создании статьи',
    'Article created': 'Статья создана',
};

const en = {
    ARTICLE_CREATE_ERROR: 'An error occurred while creating an article',
    'Article created': 'Article created',
};

i18n.addResourceBundle('ru', 'ArticleCreatePage', ru);

i18n.addResourceBundle('en', 'ArticleCreatePage', en);

declare module 'react-i18next' {
    interface ArticleCreatePageResource {
        ArticleCreatePage: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticleCreatePageResource {}
}
