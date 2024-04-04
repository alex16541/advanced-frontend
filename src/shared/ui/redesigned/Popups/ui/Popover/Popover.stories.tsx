import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Popover } from './Popover';

export default {
    title: 'shared/Popups/Popover',
    component: Popover,
    args: {},
} as Meta<typeof Popover>;

type Story = StoryObj<typeof Popover>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
