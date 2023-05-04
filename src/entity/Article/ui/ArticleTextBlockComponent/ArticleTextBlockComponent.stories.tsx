import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { ArticleTextBlockComponent } from './ArticleTextBlockComponent';

export default {
    title: 'entity/ArticleTextBlockComponent',
    component: ArticleTextBlockComponent,
    args: {
        articleBlock: {
            id: '1',
            type: 'TEXT',
            title: 'Зачем изучать RxJS?',
            paragraphs: [
                'С одной стороны, RxJS — это мощный инструмент, который позволяет превращать сложные последовательности действий в лаконичный код, с которым легко работать.',
                'С другой стороны, эта простота основывается на множестве языковых механизмов, а их изучение требует времени. Однако, полученные знания стоят затраченных усилий, когда понимаешь, что с помощью одной строки кода можно сделать что-то вроде реализации механизма «перетащить и опустить», что требует трёх наборов событий.',
                'Подобное даёт возможность связать эти события воедино (нажатие кнопки мыши, перемещение мыши, отпускание кнопки) для того, чтобы получить одну краткую и точную строку кода. При обычном подходе подобное требует программы в несколько десятков строк.',
            ],
        },
    },
} as ComponentMeta<typeof ArticleTextBlockComponent>;

const Template: ComponentStory<typeof ArticleTextBlockComponent> = (args) => (
    <ArticleTextBlockComponent {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
