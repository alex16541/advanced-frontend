import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { CreateArticleButton } from './CreateArticleButton';

export default {
    title: 'features/CreateArticleButton',
    component: CreateArticleButton,
    args: {},
} as Meta<typeof CreateArticleButton>;

type Story = StoryObj<typeof CreateArticleButton>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
