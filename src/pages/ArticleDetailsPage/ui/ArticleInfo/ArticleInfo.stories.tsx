import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleInfo } from './ArticleInfo';

export default {
    title: 'folder/ArticleInfo',
    component: ArticleInfo,
    args: {},
} as Meta<typeof ArticleInfo>;

type Story = StoryObj<typeof ArticleInfo>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
