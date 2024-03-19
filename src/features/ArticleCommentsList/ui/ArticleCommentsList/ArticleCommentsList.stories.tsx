import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleCommentsErrors } from '../../model/consts/articleCommentList';

import ArticleCommentsList from './ArticleCommentsList';

const store = {
    user: {
        authData: {
            id: '2',
            profileId: '2',
            username: 'user',
            avatar: 'tests/Avatar.jpeg',
        },
    },
    articleComments: {
        ids: ['1', '2', '3'],
        entities: {
            1: {
                text: '(づ￣ 3￣)づ',
                id: '1',
                user: {
                    id: '1',
                    username: 'root',
                    profileId: '1',
                    avatar: 'tests/Avatar2.jpg',
                },
            },
            2: {
                text: 'o(一︿一+)o',
                id: '2',
                user: {
                    id: '1',
                    username: 'root',
                    profileId: '1',
                    avatar: 'tests/Avatar2.jpg',
                },
            },
            3: {
                text: '^_____^',
                id: '3',
                user: {
                    id: '2',
                    profileId: '2',
                    username: 'user',
                    avatar: 'tests/Avatar.jpeg',
                },
            },
        },
    },
};

export default {
    title: 'features/Article/ArticleCommentsList',
    component: ArticleCommentsList,
    args: {},
} as Meta<typeof ArticleCommentsList>;

type Story = StoryObj<typeof ArticleCommentsList>;

export const Light: Story = {
    decorators: [
        StoreDecorator(store),
    ],
};

export const Dark: Story = {
    decorators: [
        StoreDecorator(store),
        ThemeDecorator(Theme.DARK),
    ],
};

export const Loading: Story = {
    decorators: [
        StoreDecorator({
            articleComments: {
                ids: [],
                entities: {},
                isLoading: true,
            },
        }),
        ThemeDecorator(Theme.DARK),
    ],
};

export const WithError: Story = {
    decorators: [
        StoreDecorator({
            articleComments: {
                ids: [],
                entities: {},
                error: [ArticleCommentsErrors.SERVER_ERROR],
            },
        }),
        ThemeDecorator(Theme.DARK),
    ],
};
