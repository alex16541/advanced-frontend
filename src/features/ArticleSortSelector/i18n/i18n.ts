import i18n from '@/shared/config/i18n';

const ru = {
    SORT_PUBLISHED_AT: 'Дате публикации',
    SORT_TITLE: 'Названию',
    SORT_VIEWS: 'Просмотрам',
};

const en = {
    SORT_PUBLISHED_AT: 'Date of publication',
    SORT_TITLE: 'Title',
    SORT_VIEWS: 'Views',
};

i18n.addResourceBundle('ru', 'ArticleSort', ru);

i18n.addResourceBundle('en', 'ArticleSort', en);

declare module 'react-i18next' {
    interface ArticleSortResource {
        ArticleSort: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticleSortResource {}
}
