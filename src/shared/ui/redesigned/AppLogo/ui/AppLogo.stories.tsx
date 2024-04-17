import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { AppLogo } from './AppLogo';

export default {
    title: 'shared/AppLogo',
    component: AppLogo,
} as Meta<typeof AppLogo>;

type Story = StoryObj<typeof AppLogo>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
