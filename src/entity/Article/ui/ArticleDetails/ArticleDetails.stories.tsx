import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ArticleType, ArticleBlockType, ArticleErrors } from '../../model/consts/article';
import { ArticleDetails } from './ArticleDetails';

export default {
    title: 'entity/Article/ArticleDetails',
    component: ArticleDetails,
    args: {},
} as ComponentMeta<typeof ArticleDetails>;

const Template: ComponentStory<typeof ArticleDetails> = (args) => (
    <ArticleDetails {...args} />
);

export const Light = Template.bind({});
Light.decorators = [
    StoreDecorator({
        articleDetails: {
            data: {
                id: '1',
                title: 'Декларативный подход к программированию на примере RxJs',
                subtitle: 'Показываем на рабочих примерах',
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
];

export const Dark = Template.bind({});
Dark.decorators = [...Light.decorators, ThemeDecorator(Theme.DARK)];

export const Loading = Template.bind({});
Loading.decorators = [
    StoreDecorator({
        articleDetails: {
            isLoading: true,
        },
    }),
];

export const Error = Template.bind({});
Error.decorators = [
    StoreDecorator({
        articleDetails: {
            error: [ArticleErrors.SERVER_ERROR],
        },
    }),
];
