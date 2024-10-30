import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Textarea } from './Textarea';

export default {
    title: 'folder/Textarea',
    component: Textarea,
    args: {},
} as Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
