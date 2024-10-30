import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleEditor } from './ArticleEditor';

export default {
    title: 'folder/ArticleEditor',
    component: ArticleEditor,
    args: {},
} as Meta<typeof ArticleEditor>;

type Story = StoryObj<typeof ArticleEditor>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
