import i18n from '@/shared/config/i18n';

const ru = {
    Rate: 'Оценить',
    'Feedback placeholder': 'Ваш отзыв',
    'Rate this article': 'Оцените статью',
};

const en = {
    Rate: 'Rate',
    'Feedback placeholder': 'Your feedback',
    'Rate this article': 'Rate this article',
};

i18n.addResourceBundle('ru', 'ArticleRating', ru);

i18n.addResourceBundle('en', 'ArticleRating', en);

declare module 'react-i18next' {
    interface ArticleRatingResource {
        ArticleRating: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticleRatingResource {}
}
