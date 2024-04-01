import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { MainLayout } from './MainLayout';

export default {
    title: 'folder/MainLayout',
    component: MainLayout,
    args: {},
} as Meta<typeof MainLayout>;

type Story = StoryObj<typeof MainLayout>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
