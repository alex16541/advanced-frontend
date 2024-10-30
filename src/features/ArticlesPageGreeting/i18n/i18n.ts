import i18n from '@/shared/config/i18n';

const ru = {
    text: 'На этой странице ты можешь найти множество разных статей на любой вкус. Приятного чтения!',
    title: 'Привет!',
};

const en = {
    title: 'Hi!',
    text: 'On this page you can find many different articles for every taste. \nEnjoy reading!',
};

i18n.addResourceBundle('ru', 'ArticlePageGreeting', ru);

i18n.addResourceBundle('en', 'ArticlePageGreeting', en);

declare module 'react-i18next' {
    interface ArticlePageGreetingResource {
        ArticlePageGreeting: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticlePageGreetingResource {}
}
