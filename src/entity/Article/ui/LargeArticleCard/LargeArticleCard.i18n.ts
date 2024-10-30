import i18n from '@/shared/config/i18n';

const ru = {
    'Read more': 'Читать далее...',
};

const en = {
    'Read more': 'Read more...',
};

i18n.addResourceBundle('ru', 'LargeArticleCard', ru);

i18n.addResourceBundle('en', 'LargeArticleCard', en);

declare module 'react-i18next' {
    interface LargeArticleCardResource {
        LargeArticleCard: ComponentResource<typeof ru>;
    }

    interface AppResources extends LargeArticleCardResource {}
}
