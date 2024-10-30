import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleTextEditor } from './ArticleTextEditor';

export default {
    title: 'folder/TextEditor',
    component: ArticleTextEditor,
    args: {},
} as Meta<typeof ArticleTextEditor>;

type Story = StoryObj<typeof ArticleTextEditor>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
