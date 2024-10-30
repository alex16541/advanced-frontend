import i18n from '@/shared/config/i18n';

const ru = {
    RUB: '₽ Рубль',
    USD: '$ Доллар США',
    EUR: '€ Евро',
};

const en = {
    RUB: '₽ Ruble',
    USD: '$ United states dollar',
    EUR: '€ Euro',
};

i18n.addResourceBundle('ru', 'CurrencySelect', ru);

i18n.addResourceBundle('en', 'CurrencySelect', en);

declare module 'react-i18next' {
    interface CurrencySelectResource {
        CurrencySelect: ComponentResource<typeof ru>;
    }

    interface AppResources extends CurrencySelectResource {}
}
