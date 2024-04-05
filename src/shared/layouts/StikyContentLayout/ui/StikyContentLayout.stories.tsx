import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { StikyContentLayout } from './StikyContentLayout';

export default {
    title: 'folder/StikyContentLayout',
    component: StikyContentLayout,
    args: {},
} as Meta<typeof StikyContentLayout>;

type Story = StoryObj<typeof StikyContentLayout>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
