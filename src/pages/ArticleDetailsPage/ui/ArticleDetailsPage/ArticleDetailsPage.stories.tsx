import { Meta, StoryObj } from '@storybook/react';

import { ArticleBlockType, ArticleType, article } from '@/entity/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import ArticleDetailsPage from './ArticleDetailsPage';

const articles = new Array(6).fill(0).map((item, index) => ({
    ...article,
    id: index.toString(),
}));

export default {
    title: 'pages/ArticleDetailsPage',
    component: ArticleDetailsPage,
    parameters: {
        mockData: [
            {
                url: `${__API__}/articles?_page=1&_limit=6&_extend=user`,
                method: 'GET',
                status: 200,
                response: articles,
            },
            {
                url: `${__API__}/articles-rating?articleId=1&userId=2`,
                method: 'GET',
                status: 200,
                response: [
                    {
                        id: '1',
                        articleId: '1',
                        userId: '1',
                        rating: '3',
                        feedback: 'Good',
                    },
                ],
            },
        ],
    },
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    id: '2',
                    profileId: '2',
                    username: 'user',
                    avatar: 'https://media.istockphoto.com/id/1269703326/vector/pixel-art-8-bit-cute-kitten-domestic-pet-saying-meow-isolated-vector.jpg?s=612x612&w=0&k=20&c=akgp8uPlUMGNZbnO-bTAksu7f1zER53qwEXExAMirko=',
                },
            },
            articleComments: {
                ids: ['1', '2', '3'],
                entities: {
                    1: {
                        text: '(づ￣ 3￣)づ',
                        id: '1',
                        user: {
                            id: '1',
                            username: 'root',
                            profileId: '1',
                            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqiaLNuTp-jJ5Mj71QJeXTlVlc1UYIYNc4A&usqp=CAU',
                        },
                    },
                    2: {
                        text: 'o(一︿一+)o',
                        id: '2',
                        user: {
                            id: '1',
                            username: 'root',
                            profileId: '1',
                            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqiaLNuTp-jJ5Mj71QJeXTlVlc1UYIYNc4A&usqp=CAU',
                        },
                    },
                    3: {
                        text: '^_____^',
                        id: '3',
                        user: {
                            id: '2',
                            profileId: '2',
                            username: 'user',
                            avatar: 'https://media.istockphoto.com/id/1269703326/vector/pixel-art-8-bit-cute-kitten-domestic-pet-saying-meow-isolated-vector.jpg?s=612x612&w=0&k=20&c=akgp8uPlUMGNZbnO-bTAksu7f1zER53qwEXExAMirko=',
                        },
                    },
                },
            },
            articleDetails: {
                data: {
                    id: '1',
                    title: 'Декларативный подход к программированию на примере RxJs',
                    subtitle: 'Показываем на рабочих примерах',
                    user: { id: '2' },
                    img: 'https://seeklogo.com/images/R/rxjs-logo-1C13E67498-seeklogo.com.png',
                    views: 37483,
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
                            src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80',
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
            },
        }),
    ],
} as Meta<typeof ArticleDetailsPage>;

type Story = StoryObj<typeof ArticleDetailsPage>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
