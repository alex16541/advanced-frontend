import i18n from '@/shared/config/i18n';

const ru = {
    Comments: 'Комментарии',
    COMMENTS_LOADING_ERROR: 'Произошла ошибка при загрузке комментариев',
};

const en = {
    Comments: 'Comments',
    COMMENTS_LOADING_ERROR: 'An error occurred while loading comments',
};

i18n.addResourceBundle('ru', 'ArticleCommentsList', ru);

i18n.addResourceBundle('en', 'ArticleCommentsList', en);

declare module 'react-i18next' {
    interface ArticleCommentsListResource {
        ArticleCommentsList: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticleCommentsListResource {}
}
