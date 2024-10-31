import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ThemeSwitcher } from './ThemeSwitcher';

export default {
    title: 'features/ThemeSwitcher',
    component: ThemeSwitcher,
    decorators: [StoreDecorator({})],
} as Meta<typeof ThemeSwitcher>;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
