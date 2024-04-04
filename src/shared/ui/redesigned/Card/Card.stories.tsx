import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Text } from '../Text/Text';

import { Card } from './Card';

export default {
    title: 'shared/Card',
    component: Card,
    args: {
        children: <Text text="Some card with text" />,
    },
} as Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
