import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { StikyHeaderLayout } from './StikyHeaderLayout';

export default {
    title: 'folder/StikyHeaderLayout',
    component: StikyHeaderLayout,
    args: {},
} as Meta<typeof StikyHeaderLayout>;

type Story = StoryObj<typeof StikyHeaderLayout>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
