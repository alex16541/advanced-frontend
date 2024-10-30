import i18n from '@/shared/config/i18n';

const ru = {
    NO_DATA: 'Нет данных',
};

const en = {
    NO_DATA: 'No data',
};

i18n.addResourceBundle('ru', 'ArticlesList', ru);

i18n.addResourceBundle('en', 'ArticlesList', en);

declare module 'react-i18next' {
    interface ArticlesListResource {
        ArticlesList: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticlesListResource {}
}
