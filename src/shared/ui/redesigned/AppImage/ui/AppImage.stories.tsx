import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { AppImage } from './AppImage';

export default {
    title: 'shared/AppImage',
    component: AppImage,
    args: {
        src: 'tests/Avatar.jpeg',
    },
} as Meta<typeof AppImage>;

type Story = StoryObj<typeof AppImage>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
