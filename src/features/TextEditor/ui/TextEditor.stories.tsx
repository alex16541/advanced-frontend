import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { TextEditor } from './TextEditor';

export default {
    title: 'folder/TextEditor',
    component: TextEditor,
    args: {

    },
} as Meta<typeof TextEditor>;

type Story = StoryObj<typeof TextEditor>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};