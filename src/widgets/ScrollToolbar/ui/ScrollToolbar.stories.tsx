import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ScrollToolbar } from './ScrollToolbar';

export default {
    title: 'widgets/ScrollToolbar',
    component: ScrollToolbar,
} as Meta<typeof ScrollToolbar>;

type Story = StoryObj<typeof ScrollToolbar>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
