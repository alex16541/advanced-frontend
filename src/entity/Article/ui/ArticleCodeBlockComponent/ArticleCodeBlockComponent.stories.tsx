import { Meta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';

export default {
    title: 'entity/Article/ArticleCodeBlockComponent',
    component: ArticleCodeBlockComponent,
    args: {
        articleBlock: {
            id: '4',
            type: 'CODE',
            code: "const source = Observable.create((observer) => {\n    let count = 0;\n    console.log('Observable created');\n\n    const timer = setInterval(() => {\n        observer.next(count);\n        count++;\n    }, 1000);\n\n    return () => {\n        console.log('Observable destroyed');\n        clearInterval(timer);\n    }\n});",
        },
    },
} as Meta<typeof ArticleCodeBlockComponent>;

const Template: ComponentStory<typeof ArticleCodeBlockComponent> = (args) => (
    <ArticleCodeBlockComponent {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
