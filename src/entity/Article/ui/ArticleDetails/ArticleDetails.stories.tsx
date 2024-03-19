import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleType, ArticleBlockType, ArticleErrors } from '../../model/consts/article';

import { ArticleDetails } from './ArticleDetails';

const articleDetails = {
    data: {
        id: '1',
        title: 'Декларативный подход к программированию на примере RxJs',
        subtitle: 'Показываем на рабочих примерах',
        img: 'tests/Background.jpg',
        views: 37483,
        user: {
            id: '1',
            username: 'user1',
            avatar: 'tests/Avatar.jpeg',
        },
        createdAt: '10.10.2000',
        type: [ArticleType.IT],
        blocks: [
            {
                id: '1',
                type: ArticleBlockType.TEXT,
                title: 'Зачем изучать RxJS?',
                paragraphs: [
                    'С одной стороны, RxJS — это мощный инструмент, который позволяет превращать сложные последовательности действий в лаконичный код, с которым легко работать.',
                    'С другой стороны, эта простота основывается на множестве языковых механизмов, а их изучение требует времени. Однако, полученные знания стоят затраченных усилий, когда понимаешь, что с помощью одной строки кода можно сделать что-то вроде реализации механизма «перетащить и опустить», что требует трёх наборов событий.',
                    'Подобное даёт возможность связать эти события воедино (нажатие кнопки мыши, перемещение мыши, отпускание кнопки) для того, чтобы получить одну краткую и точную строку кода. При обычном подходе подобное требует программы в несколько десятков строк.',
                ],
            },
            {
                id: '2',
                type: ArticleBlockType.IMAGE,
                title: 'Mauntains',
                src: 'tests/Background.jpg',
            },
            {
                id: '3',
                type: ArticleBlockType.TEXT,
                title: 'Какие преимущества даёт использование RxJS?',
                paragraphs: [
                    'Одна из наиболее привлекательных возможностей, открывающихся при интеграции RxJS в код, заключается в том, что чем больше вы этим пользуетесь, тем больше вы сможете с помощью этой технологии сделать. RxJS можно сравнить с конструктором Lego, в том смысле, что Lego отлично подходит для разработки новых конструкций, так как все кубики имеют одинаковую форму. Похожим образом, все наблюдаемые объекты выглядят одинаково, поэтому создание чего-то с их использованием становится увлекательной задачей, так как вы можете экспериментировать со множеством интересных решений. Чем больше некто использует наблюдаемые объекты в коде, тем больше возможностей получает в создании чего-то нового на основе существующих структур.',
                ],
            },
            {
                id: '4',
                type: ArticleBlockType.CODE,
                code: "const source = Observable.create((observer) => {\n    let count = 0;\n    console.log('Observable created');\n\n    const timer = setInterval(() => {\n        observer.next(count);\n        count++;\n    }, 1000);\n\n    return () => {\n        console.log('Observable destroyed');\n        clearInterval(timer);\n    }\n});",
            },
        ],
    },
};

export default {
    title: 'entity/Article/ArticleDetails',
    component: ArticleDetails,
    args: {},
} as Meta<typeof ArticleDetails>;

type Story = StoryObj<typeof ArticleDetails>;

export const Light: Story = {
    decorators: [
        StoreDecorator({ articleDetails }),
    ],
};

export const Dark: Story = {
    decorators: [
        StoreDecorator({ articleDetails }),
        ThemeDecorator(Theme.DARK),
    ],
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
                error: [ArticleErrors.SERVER_ERROR],
            },
        }),
    ],
};
