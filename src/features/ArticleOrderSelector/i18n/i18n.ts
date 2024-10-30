import i18n from '@/shared/config/i18n';

const ru = {
    ORDER_ASC: 'По возрастанию',
    ORDER_DESC: 'По убыванию',
};

const en = {
    ORDER_ASC: 'Ascending',
    ORDER_DESC: 'Descending',
};

i18n.addResourceBundle('ru', 'ArticleOrder', ru);

i18n.addResourceBundle('en', 'ArticleOrder', en);

declare module 'react-i18next' {
    interface ArticleOrderResource {
        ArticleOrder: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticleOrderResource {}
}
