import i18n from '@/shared/config/i18n';

const ru = {
    'Leave a rating': 'Оставить оценку',
    'Thank you for rating': 'Спасибо за оценку!',
    'Feedback form': 'Форма обратной связи',
    'Review fields': 'Поля для отзыва',
    Cancel: 'Отмена',
    Send: 'Отпарвить',
};

const en = {
    'Leave a rating': 'Leave a rating',
    'Thank you for rating': 'Thank you for rating!',
    'Feedback form': 'Feedback form',
    'Review fields': 'Review fields',
    Cancel: 'Cancel',
    Send: 'Send',
};

i18n.addResourceBundle('ru', 'RatingCard', ru);

i18n.addResourceBundle('en', 'RatingCard', en);

declare module 'react-i18next' {
    interface RatingCardResource {
        RatingCard: ComponentResource<typeof ru>;
    }

    interface AppResources extends RatingCardResource {}
}
