import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import ArticlePublishPage from './ArticlePublishPage';

export default {
    title: 'folder/ArticlePublishPage',
    component: ArticlePublishPage,
} as Meta<typeof ArticlePublishPage>;

type Story = StoryObj<typeof ArticlePublishPage>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
