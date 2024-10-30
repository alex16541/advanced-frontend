import i18n from '@/shared/config/i18n';

const ru = {
    placeholder: 'Напишите что-нибудь здесь...',
};

const en = {
    placeholder: 'Write something here...',
};

i18n.addResourceBundle('ru', 'TextEditor', ru);

i18n.addResourceBundle('en', 'TextEditor', en);

declare module 'react-i18next' {
    interface TextEditorResource {
        TextEditor: ComponentResource<typeof ru>;
    }

    interface AppResources extends TextEditorResource {}
}
