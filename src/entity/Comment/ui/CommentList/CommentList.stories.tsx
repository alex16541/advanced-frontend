import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { CommentList } from './CommentList';

export default {
    title: 'entity/Comment/CommentList',
    component: CommentList,
    args: {
        comments: [
            {
                text: '(づ￣ 3￣)づ',
                id: '1',
                user: {
                    id: '1',
                    username: 'root',
                    profileId: '1',
                    avatar: 'tests/Avatar2.jpg',
                },
            },
            {
                text: 'o(一︿一+)o',
                id: '2',
                user: {
                    id: '1',
                    username: 'root',
                    profileId: '1',
                    avatar: 'tests/Avatar2.jpg',
                },
            },
            {
                text: '^_____^',
                id: '3',
                user: {
                    id: '2',
                    profileId: '2',
                    username: 'user',
                    avatar: 'tests/Avatar.jpeg',
                },
            },
        ],
    },
} as Meta<typeof CommentList>;

type Story = StoryObj<typeof CommentList>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
