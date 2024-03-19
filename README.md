## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start или npm run start:vite и npm start:db - запуск сервера + frontend проекта в dev режиме
```

----

## Скрипты

- `npm run start` - Запуск webpack:* скриптов под concurrently
- `npm run start:db` - Запуск backend сервера 
- `npm run start:vite` - Запуск frontend сервера под Vite
- `npm run webpack:app` - Запуск frontend сервера
- `npm run webpack:db` - Запуск backend сервера (для запуска в `npm run start`)
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run analyze` - Запуск анализатора бандлов
- `npm run test:unit` - Запуск unit тестов с jest
- `npm run test:e2e` - Запуск e2e тестов с cypress
- `npm run test:ui` - Запуск скриншотных тестов с loki
- `npm run test:ui:ok` - Подтверждение новых скриншотов
- `npm run test:ui:ci` - Запуск скриншотных тестов в CI
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
- `npm run test:ui:json` - Генерация json отчета для скриншотных тестов
- `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов
- `npm run storybook` - Запуск storybook
- `npm run storybook:build` - Сборка storybook
- `npm run prepare` - Запуск предварительной настройки окружения для проекта (Сейчас - станавливает husky)
- `npm run gen` - Скрипт для генерации FSD слайсов
- `npm run gen:doc` - Скрипт для генерации документации

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

----

## Тесты

В проекте используются 4 вида тестов:
1) Обычные unit тесты на jest - `npm run test:unit`
2) Тесты на компоненты с React testing library -`npm run test:unit`
3) Скриншотное тестирование с loki `npm run test:ui`
4) e2e тестирование с Cypress `npm run test:e2e`

Подробнее о тестах - [документация тестирование](/docs/tests.md)

----

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin *eslint-plugin-alex16541-fsd-imports-path-checker*,
который содержит 3 правила
1) relative-path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2) layers-imports - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и entitites)
3) public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

##### Запуск линтеров
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером

----
## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создается с расширением .stories.tsx рядом с компонентом 

Запустить сторибук можно командой:
- `npm run storybook`

Подробнее о [Storybook](/docs/storybook.md)

Пример:

```typescript jsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Button, ButtonSize, ButtonTheme } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Button>;

type Story = StoryObj<Button>;

export const Primary: Story = {
    args: {
        children: 'Text',
    },
};

export const PrimaryDark: Story = {
    args = {
        children: 'Button',
        theme: ButtonThemes.PRIMARY,
    },
    decorators: [
        ThemeDecorator(Theme.DARK)
    ],
};

export const Clear: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.CLEAR,
    },
};

```


----

## Конфигурация проекта

Для разработки проект содержит 2 конфига:
1. Webpack - ./config/build
2. Vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config
- /config/babel - babel
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

----

## CI pipeline и pre commit хуки

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.

В прекоммит хуках проверяем проект линтерами, конфиг в /.husky

----

### Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

----


## Сущности (entity)

- [Article](/src/entity/Article/README.md)
- [Comment](/src/entity/Comment/README.md)
- [Counter](/src/entity/Counter/README.md)
- [Country](/src/entity/Country/README.md)
- [Currency](/src/entity/Currency/README.md)
- [Notification](/src/entity/Notification/README.md)
- [Profile](/src/entity/Profile/README.md)
- [Rating](/src/entity/Rating/README.md)
- [User](/src/entity/User/README.md)

## Фичи (features)
- [ArticleCommntsList](/src/features/ArticleCommentsList/README.md)
- [ArticleRating](/src/features/ArticleRating/README.md)
- [ArticleRecommendationsList](/src/features/ArticleRecommendationsList/README.md)
- [AuthByUsername](/src/features/AuthByUsername/README.md)
- [AvatarButton](/src/features/AvatarButton/README.md)
- [EditableProfileCard](/src/features/EditableProfileCard/README.md)
- [LangSwitcher](/src/features/LangSwitcher/README.md)
- [NotificationsButton](/src/features/NotificationsButton/README.md)
- [ThemeSwitcher](/src/features/ThemeSwitcher/README.md)
