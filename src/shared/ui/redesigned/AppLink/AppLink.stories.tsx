import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { AppLink } from './AppLink';

export default {
    title: 'shared/AppLink',
    component: AppLink,
    args: {
        to: '#',
        children: 'app link',
    },
} as Meta<typeof AppLink>;

type Story = StoryObj<typeof AppLink>;

export const PrimaryLight: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const SecondaryLight: Story = {
    args: {
        theme: 'secondary',
    },
};

export const SecondaryDark: Story = {
    args: {
        theme: 'secondary',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
