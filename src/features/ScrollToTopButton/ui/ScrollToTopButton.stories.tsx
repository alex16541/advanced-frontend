import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ScrollToTopButton } from './ScrollToTopButton';

export default {
    title: 'features/ScrollToTopButton',
    component: ScrollToTopButton,
} as Meta<typeof ScrollToTopButton>;

type Story = StoryObj<typeof ScrollToTopButton>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
