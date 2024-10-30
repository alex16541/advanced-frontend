import i18n from '@/shared/config/i18n';

const ru = {
    'new title': 'Новая статья',
    'Image not found': 'Изображение не найдено',
    title: 'Заголовок',
    'Change cover': 'Изменить обложку',
    'Add cover': 'Добавить обложку',
    'Set random cover': 'Случайнуая обложка',
    Confirm: 'Установить',
    'Set cover': 'Установить обложку',
    'Cover URL': 'URL обложки',
};

const en = {
    'new title': 'New article',
    'Image not found': 'Image not found',
    title: 'Title',
    'Change cover': 'Change cover',
    'Add cover': 'Add cover',
    'Set random cover': 'Set random cover',
    Confirm: 'Confirm',
    'Set cover': 'Set cover',
    'Cover URL': 'Cover URL',
};

i18n.addResourceBundle('ru', 'ArticleEditor', ru);

i18n.addResourceBundle('en', 'ArticleEditor', en);

declare module 'react-i18next' {
    interface ArticleEditorResource {
        ArticleEditor: ComponentResource<typeof ru>;
    }

    interface AppResources extends ArticleEditorResource {}
}
