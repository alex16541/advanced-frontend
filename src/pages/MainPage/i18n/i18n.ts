/* eslint-disable max-len */
import i18n from '@/shared/config/i18n';

const ru = {
    'main page title': 'Главная',
    'welcome title': 'Привет! Добро пожаловать на Forkat!',
    'welcome text 1':
        'Этот сайт я сделал для того, чтобы объединить всё, что помогает мне в повседневной жизни - задачи, личные заметки и архив информации. Всё здесь связано и работает в симбиозе, чтобы ты мог легко управлять своими мыслями, задачами и идеями.',
    'welcome dot 1': '» Создавай и храни заметки',
    'welcome dot 2': '» Организовывай личные записи',
    'welcome dot 3': '» Отслеживай задачи и время, которое на них тратишь',
    'welcome text 2':
        'Это ещё не окончательная версия, и я постоянно развиваю функционал. Можешь войти под своей учётной записью или попробовать тестовый аккаунт, чтобы оценить возможности Forkat.',
};

const en = {
    'main page title': 'Main',
    'welcome title': 'Hi! Welcom to Forkat!',
    'welcome text 1':
        'I create this site to bring together everything that helps me in my daily life - tasks, personal notes, and an information archive. Everything herre is interconnected and works in symbiosis, allowing you to easyly manage your thoughts, tasks, and ideas.',
    'welcome dot 1': '» Create and store notes',
    'welcome dot 2': '» Orgonize personal records',
    'welcome dot 3': '» Track tasks and the time spent on them',
    'welcome text 2':
        "This is not the final version, and I'm constantly debeloping new features. You can log in with your account or try the \ntest account to explore the possibilities of Forkat.",
};

i18n.addResourceBundle('ru', 'MainPage', ru);

i18n.addResourceBundle('en', 'MainPage', en);

declare module 'react-i18next' {
    interface MainPageResource {
        MainPage: ComponentResource<typeof ru>;
    }

    interface AppResources extends MainPageResource {}
}
