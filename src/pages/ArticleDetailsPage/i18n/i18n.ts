import i18n from '@/shared/config/i18n';

const ru = {
    NOT_FOUND: 'Статья не найдена',
    views: 'Просмотры',
    views_zero: '{{count}} просмотров',
    views_one: '{{count}} просмотр',
    views_two: '{{count}} просмотра',
    views_few: '{{count}} просмотров',
    views_many: '{{count}} просмотров',
    views_other: '{{count}} просмотров',
    edit: 'Редактировать',
    back: 'Назад к списку статей',

    Recommendations: 'Рекомендуем',
};

const en = {
    NOT_FOUND: 'Article not found',
    views: 'Views',
    views_zero: '{{count}} views',
    views_one: '{{count}} views',
    views_two: '{{count}} view',
    views_few: '{{count}} views',
    views_many: '{{count}} views',
    views_other: '{{count}} views',
    edit: 'Edit',
    back: 'Back to article list',

    Recommendations: 'Recommendations',
};

i18n.addResourceBundle('ru', 'ArticleDetailsPage', ru);

i18n.addResourceBundle('en', 'ArticleDetailsPage', en);

declare module 'react-i18next' {
    interface ArticleDetailsPageResource {
        ArticleDetailsPage: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticleDetailsPageResource {}
}
