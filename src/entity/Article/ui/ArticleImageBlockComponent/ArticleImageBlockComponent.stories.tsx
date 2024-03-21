import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleImageBlockComponent } from './ArticleImageBlockComponent';

export default {
    title: 'entity/Article/ArticleImageBlockComponent',
    component: ArticleImageBlockComponent,
    args: {
        articleBlock: {
            id: '2',
            type: 'IMAGE',
            title: 'Mauntains',
            src: 'tests/Background.jpg',
        },
    },
} as Meta<typeof ArticleImageBlockComponent>;

type Story = StoryObj<typeof ArticleImageBlockComponent>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
