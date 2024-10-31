import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleErrorBoundary } from './ArticleErrorBoundary';

export default {
    title: 'entity/Article/ArticleErrorBoundary',
    component: ArticleErrorBoundary,
    args: {
        error: 'FORBIDDEN',
    },
} as Meta<typeof ArticleErrorBoundary>;

type Story = StoryObj<typeof ArticleErrorBoundary>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
