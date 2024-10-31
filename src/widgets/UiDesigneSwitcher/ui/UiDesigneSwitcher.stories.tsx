import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { UiDesigneSwitcher } from './UiDesigneSwitcher';

export default {
    title: 'widgets/UiDesigneSwitcher',
    component: UiDesigneSwitcher,
    decorators: [StoreDecorator({})],
} as Meta<typeof UiDesigneSwitcher>;

type Story = StoryObj<typeof UiDesigneSwitcher>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
