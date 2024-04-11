import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleEditButton } from './ArticleEditButton';

export default {
    title: 'folder/ArticleEditButton',
    component: ArticleEditButton,
    args: {},
} as Meta<typeof ArticleEditButton>;

type Story = StoryObj<typeof ArticleEditButton>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
