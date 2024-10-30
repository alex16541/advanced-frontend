import i18n from '@/shared/config/i18n';

const ru = {
    'Sort by': 'Сортировать по',
    Find: 'Найти',
    PAGE_LOADIN_UNKNOWN_ERROR: 'Ошибка при загрузке статей',
    'Try agen': 'Попробовать ещё раз',
};

const en = {
    'Sort by': 'Sort by',
    Find: 'Find',
    PAGE_LOADIN_UNKNOWN_ERROR: 'Error while loading articles',
    'Try agen': 'Try again',
};

i18n.addResourceBundle('ru', 'ArticlesPage', ru);

i18n.addResourceBundle('en', 'ArticlesPage', en);

declare module 'react-i18next' {
    interface ArticlesPageResource {
        ArticlesPage: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticlesPageResource {}
}
