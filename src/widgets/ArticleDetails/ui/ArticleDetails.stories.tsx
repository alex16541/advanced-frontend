import { Meta, StoryObj } from '@storybook/react';

import { ArticleType } from '@/entity/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleDetails } from './ArticleDetails';

const articleDetails = {
    data: {
        id: '1',
        title: 'Декларативный подход к программированию на примере RxJs',
        description: '{}',
        img: 'tests/Background.jpg',
        views: 37483,
        user: {
            id: '1',
            username: 'user1',
            avatar: 'tests/Avatar.jpeg',
        },
        createdAt: '10.10.2000',
        type: [ArticleType.IT],
        updatedAt: '11.10.2024, 15:41:56',
        publishedAt: '11.10.2024, 15:41:56',
        editorState:
            // eslint-disable-next-line no-template-curly-in-string
            '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Продуктивность — это ключ к успешной и насыщенной жизни. В этой статье я расскажу о простых, но эффективных методах повышения своей продуктивности.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"quote","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"1. Планируйте свой день","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h2"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Создание плана на день помогает структурировать задачи и не забывать о важных делах. Например:","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Проснуться в 7:00 и сделать утреннюю зарядку.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Позавтракать и запланировать задачи на день.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Выполнить задачи с высоким приоритетом до обеда.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":3},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Выделить время на отдых и личные дела.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":4}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"2. Используйте технологии","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h2"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Преимущества цифровых инструментов","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h3"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Современные технологии помогают лучше организовать рабочий процесс. Существуют различные приложения и сервисы, которые облегчают планирование и управление временем.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Todoist","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" — для отслеживания задач.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Obsidian","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" — для ведения заметок.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Trello","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" — для управления проектами.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":3}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"3. Избегайте многозадачности","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h2"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Фокусируйтесь на одной задаче в единицу времени. Это помогает избежать стресса и сохранять концентрацию. Попробуйте выполнить следующие действия:","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"function","type":"code-highlight","version":1,"highlightType":"keyword"},{"detail":0,"format":0,"mode":"normal","style":"","text":" ","type":"code-highlight","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"focusOnTask","type":"code-highlight","version":1,"highlightType":"function"},{"detail":0,"format":0,"mode":"normal","style":"","text":"(","type":"code-highlight","version":1,"highlightType":"punctuation"},{"detail":0,"format":0,"mode":"normal","style":"","text":"task","type":"code-highlight","version":1,"highlightType":"parameter"},{"detail":0,"format":0,"mode":"normal","style":"","text":")","type":"code-highlight","version":1,"highlightType":"punctuation"},{"detail":0,"format":0,"mode":"normal","style":"","text":" ","type":"code-highlight","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"{","type":"code-highlight","version":1,"highlightType":"punctuation"},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"  console","type":"code-highlight","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":".","type":"code-highlight","version":1,"highlightType":"punctuation"},{"detail":0,"format":0,"mode":"normal","style":"","text":"log","type":"code-highlight","version":1,"highlightType":"function"},{"detail":0,"format":0,"mode":"normal","style":"","text":"(","type":"code-highlight","version":1,"highlightType":"punctuation"},{"detail":0,"format":0,"mode":"normal","style":"","text":"\\"Фокусируюсь на задаче: ${task}\\"","type":"code-highlight","version":1,"highlightType":"string"},{"detail":0,"format":0,"mode":"normal","style":"","text":")","type":"code-highlight","version":1,"highlightType":"punctuation"},{"detail":0,"format":0,"mode":"normal","style":"","text":";","type":"code-highlight","version":1,"highlightType":"punctuation"},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"}","type":"code-highlight","version":1,"highlightType":"punctuation"},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"focusOnTask","type":"code-highlight","version":1,"highlightType":"function"},{"detail":0,"format":0,"mode":"normal","style":"","text":"(","type":"code-highlight","version":1,"highlightType":"punctuation"},{"detail":0,"format":0,"mode":"normal","style":"","text":"\\"Написание статьи\\"","type":"code-highlight","version":1,"highlightType":"string"},{"detail":0,"format":0,"mode":"normal","style":"","text":")","type":"code-highlight","version":1,"highlightType":"punctuation"},{"detail":0,"format":0,"mode":"normal","style":"","text":";","type":"code-highlight","version":1,"highlightType":"punctuation"}],"direction":"ltr","format":"","indent":0,"type":"code","version":1,"language":"javascript"},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"4. Делайте перерывы","type":"text","version":1}],"direction":"ltr","format":"left","indent":0,"type":"heading","version":1,"tag":"h2"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Не забывайте об отдыхе. Каждый час делайте небольшие перерывы, чтобы дать мозгу отдохнуть. Используйте технику Pomodoro: 25 минут работы и 5 минут отдыха.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"altText":"Picture background","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":600,"showCaption":false,"src":"https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_657a0e7a254ced40861fc3a0_657a0f9d6dbe6b1938de40b9/scale_1200","type":"image","version":1,"width":0}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":2,"textStyle":""},{"children":[{"detail":0,"format":2,"mode":"normal","style":"","text":"Рисунок 1. Пример использования техники Pomodoro.","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"paragraph","version":1,"textFormat":2,"textStyle":""},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Заключение","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h2"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Следуя этим простым шагам, вы сможете повысить свою продуктивность и достигнуть большего в жизни. Главное — не забывать о балансе между работой и отдыхом.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Начните уже сегодня!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":1,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    },
};

export default {
    title: 'entity/Article/ArticleDetails',
    component: ArticleDetails,
    args: {},
} as Meta<typeof ArticleDetails>;

type Story = StoryObj<typeof ArticleDetails>;

export const Light: Story = {
    decorators: [StoreDecorator({ articleDetails })],
};

export const Dark: Story = {
    decorators: [StoreDecorator({ articleDetails }), ThemeDecorator(Theme.DARK)],
};

export const Loading: Story = {
    decorators: [
        StoreDecorator({
            articleDetails: {
                isLoading: true,
            },
        }),
    ],
};

export const Error: Story = {
    decorators: [
        StoreDecorator({
            articleDetails: {
                error: ['SERVER_ERROR'],
            },
        }),
    ],
};