import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import ArticleCreatePage from './ArticleCreatePage';

export default {
    title: 'folder/ArticleCreatePage',
    component: ArticleCreatePage,
    args: {},
} as Meta<typeof ArticleCreatePage>;

type Story = StoryObj<typeof ArticleCreatePage>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
