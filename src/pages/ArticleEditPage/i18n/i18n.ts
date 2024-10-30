import i18n from '@/shared/config/i18n';

const ru = {
    'Article editor': 'Редактор статьи',
    Save: 'Сохранить',
    Delete: 'Удалить статью',
    Cancel: 'Отмена',
    'Save and publish': 'Сохранить и опубликовать',
    'Delete article': 'Удалить статью',
    'Delete article confirmation text': 'Вы уверены, что хотите удалить эту статью?',
};

const en = {
    'Article editor': 'Article editor',
    Save: 'Save',
    Delete: 'Delete article',
    Cancel: 'Cancel',
    'Save and publish': 'Save and publish',
    'Delete article': 'Delete article',
    'Delete article confirmation text': 'Are you sure you want to delete this article?',
};

i18n.addResourceBundle('ru', 'ArticleEditPage', ru);

i18n.addResourceBundle('en', 'ArticleEditPage', en);

declare module 'react-i18next' {
    interface ArticleEditPageResource {
        ArticleEditPage: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticleEditPageResource {}
}
