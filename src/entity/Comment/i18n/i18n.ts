import i18n from '@/shared/config/i18n';

const ru = {
    'Your comment': 'Ваш комментарий',
};

const en = {
    'Your comment': 'Your comment',
};

i18n.addResourceBundle('ru', 'CommentForm', ru);

i18n.addResourceBundle('en', 'CommentForm', en);

declare module 'react-i18next' {
    interface CommentFormResource {
        CommentForm: ComponentResource<typeof ru>;
    }

    interface AppResources extends CommentFormResource {}
}
