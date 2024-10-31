import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import editorState from '../mock/EditorState.json';

import { ArticleEditor } from './ArticleEditor';

const article = {
    id: '1',
    title: 'Very interesting article',
    img: 'tests/Background.jpg',
    editorState: JSON.stringify(editorState),
    views: 0,
    type: [],
    user: {
        id: '1',
        username: 'username',
        profileId: '1',
    },
    createdAt: '10.10.2000',
    updatedAt: '10.10.2000',
    publishedAt: '10.10.2000',
};

export default {
    title: 'features/ArticleEditor',
    component: ArticleEditor,
    args: {
        editable: true,
        article,
    },
} as Meta<typeof ArticleEditor>;

type Story = StoryObj<typeof ArticleEditor>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Empty: Story = {
    args: {
        article: undefined,
    },
};

export const WithoutCover: Story = {
    args: {
        article: {
            ...article,
            img: '',
        },
    },
};
