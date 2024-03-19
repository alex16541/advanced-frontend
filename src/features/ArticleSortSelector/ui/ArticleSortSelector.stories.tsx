import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleSortSelector } from './ArticleSortSelector';

export default {
    title: 'folder/ArticleSortSelector',
    component: ArticleSortSelector,
} as Meta<typeof ArticleSortSelector>;

type Story = StoryObj<typeof ArticleSortSelector>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
