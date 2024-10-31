import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleDetailsSkeleton } from './ArticleDetailsSkeleton';

export default {
    title: 'entity/Article/ArticleDetailsSkeleton',
    component: ArticleDetailsSkeleton,
    args: {},
} as Meta<typeof ArticleDetailsSkeleton>;

type Story = StoryObj<typeof ArticleDetailsSkeleton>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
