import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { AppLoaderLayout } from './AppLoaderLayout';

export default {
    title: 'shared/layouts/AppLoaderLayout',
    component: AppLoaderLayout,
    args: {},
} as Meta<typeof AppLoaderLayout>;

type Story = StoryObj<typeof AppLoaderLayout>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
