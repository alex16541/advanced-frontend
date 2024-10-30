import i18n from '@/shared/config/i18n';

const ru = {
    all: 'Все темы',
    it: 'IT',
    art: 'Искусство',
    life: 'Жизнь',
};

const en = {
    all: 'All themes',
    it: 'IT',
    art: 'Art',
    life: 'Life',
};

i18n.addResourceBundle('ru', 'ArticleTypeChips', ru);

i18n.addResourceBundle('en', 'ArticleTypeChips', en);

declare module 'react-i18next' {
    interface ArticleTypeChipsResource {
        ArticleTypeChips: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticleTypeChipsResource {}
}
