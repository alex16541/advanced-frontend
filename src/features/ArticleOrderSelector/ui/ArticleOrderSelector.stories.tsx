import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleOrderSelector } from './ArticleOrderSelector';

export default {
    title: 'features/ArticleOrderSelector',
    component: ArticleOrderSelector,
    args: {},
} as Meta<typeof ArticleOrderSelector>;

type Story = StoryObj<typeof ArticleOrderSelector>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
