import i18n from '@/shared/config/i18n';

const ru = {
    'Select tags': 'Выберите теги',
    'Add description': 'Добавить описание',
    'Write article description here': 'Напишите описание статьи здесь',
    'Publish article': 'Настройки публикации',
    Cancel: 'Отмена',
    Publish: 'Опубликовать',
};

const en = {
    'Select tags': 'Select tags',
    'Add description': 'Add description',
    'Write article description here': 'Write article description here',
    'Publish article': 'Publish article',
    Cancel: 'Cancel',
    Publish: 'Publish',
};

i18n.addResourceBundle('ru', 'ArticlePublishPage', ru);

i18n.addResourceBundle('en', 'ArticlePublishPage', en);

declare module 'react-i18next' {
    interface ArticlePublishPageResource {
        ArticlePublishPage: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticlePublishPageResource {}
}
