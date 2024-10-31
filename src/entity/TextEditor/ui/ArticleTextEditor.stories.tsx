import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleTextEditor } from './ArticleTextEditor';

export default {
    title: 'entity/TextEditor/ArticleTextEditor',
    component: ArticleTextEditor,
    args: {
        editable: true,
    },
} as Meta<typeof ArticleTextEditor>;

type Story = StoryObj<typeof ArticleTextEditor>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
