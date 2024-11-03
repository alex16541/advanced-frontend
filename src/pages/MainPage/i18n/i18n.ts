/* eslint-disable max-len */
import i18n from '@/shared/config/i18n';

const ru = {
    'main page title': 'Главная',
    'welcome title': 'Привет! Добро пожаловать в мой блог Forkat!',
    'welcome text 1':
        'Forkat – это не просто блог, это демонстрация части моих навыков и опыта. Я вложил много сил в создание удобной и функциональной платформы, где каждый может найти что-то интересное для себя.',

    'welcome subtitle 1': '📋 Основные функции:',
    'welcome dot 1': '» Система аккаунтов и профилей пользователей',
    'welcome dot 2': '» CRUD статей',
    'welcome dot 3': '» Поисковая страница статей',
    'welcome dot 4': '» Комментарии и оценка статей',
    'welcome dot 5': '» Кастомный редактор статей на базе Lexical',
    'welcome dot 6': '» Темизация ',
    'welcome dot 7': '» Локализация на русском и английском языках',

    'welcome subtitle 2': '🚀 Основная ценность проекта - под капотом:',
    'welcome dot 8': '» Архитектура по FSD',
    'welcome dot 9': '» Кастомный UI-kit',
    'welcome dot 10': '» Vite или Webpack сборка на выбор',
    'welcome dot 11': '» Storybook',
    'welcome dot 12': '» Юнит, компонентное, скриншотное и интеграционное тестирование',
    'welcome dot 13': '» Redux  (toolkit и rtk-query) для стейта ',
    'welcome dot 14': '» Настроенный CI/CD на Github',
    'welcome dot 15': '» Скрипты для автоматизированного рефакторинга и создания компонентов по FSD',
    'welcome dot 16': '» Eslint и stylelint с самописными плагинами и правилами',

    'welcome text 2':
        'Forkat – это лишь одна из многих страниц моей профессиональной истории. Если вам нужен специалист, готовый брать на себя сложные задачи и добиваться результатов, давайте обсудим, как я могу помочь вашему проекту!',
    'welcome subtitle 3': '🧠 Чтобы узнать больше можете:',
    login: '» Войти под тестовым пользователем',
    github: '» Посетить репозиторий проекта на GitHub',
    storybook: '» Посетить библиотеку компонентов Storybook',
};

const en = {
    'main page title': 'Main',
    'welcome title': 'Hello! Welcome to my blog Forkat!',
    'welcome text 1':
        'Forkat is not just a blog, it is a part of my skills and experience. I have put much effort in creating an easy and functional platform where every can find something interesting for himself.',

    'welcome subtitle 1': '📋 Main features:',
    'welcome dot 1': '» Account and profile management system',
    'welcome dot 2': '» CRUD of articles',
    'welcome dot 3': '» Search page of articles',
    'welcome dot 4': '» Comments and rating of articles',
    'welcome dot 5': '» Custom editor of articles based on Lexical',
    'welcome dot 6': '» Themeization',
    'welcome dot 7': '» Localization in English and Russian languages',

    'welcome subtitle 2': '🚀 The main value of the project - in particular:',
    'welcome dot 8': '» Architecture by FSD',
    'welcome dot 9': '» Custom UI-kit',
    'welcome dot 10': '» Vite or Webpack build on the choice',
    'welcome dot 11': '» Storybook',
    'welcome dot 12': '» Unit, component, screenshot and integration testing',
    'welcome dot 13': '» Redux (toolkit and rtk-query) for state',
    'welcome dot 14': '» Configured CI/CD on Github',
    'welcome dot 15': '» Scripts for automated refactoring and creating components by FSD',
    'welcome dot 16': '» Eslint and stylelint with custom plugins and rules',

    'welcome text 2':
        'Forkat is a part of my professional and personal history. If you need a specialist, ready to take on the tasks and achieve results, let us discuss how I can help your project!',
    'welcome subtitle 3': '🧠 To learn more, you can:',
    login: '» Login as a test user',
    github: '» Visit the project repository on GitHub',
    storybook: '» Visit the Storybook library',
};

i18n.addResourceBundle('ru', 'MainPage', ru);

i18n.addResourceBundle('en', 'MainPage', en);

declare module 'react-i18next' {
    interface MainPageResource {
        MainPage: ComponentResource<typeof ru>;
    }

    interface AppResources extends MainPageResource {}
}
