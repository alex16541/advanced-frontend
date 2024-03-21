import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { CommentCard } from './CommentCard';

export default {
    title: 'entity/Comment/CommentCard',
    component: CommentCard,
    args: {
        comment: {
            id: '1',
            user: {
                id: '1',
                username: 'user123',
                profileId: '1',
                avatar: 'tests/Avatar.jpeg',
            },
            text: 'Some comment!',
        },
    },
} as Meta<typeof CommentCard>;

type Story = StoryObj<typeof CommentCard>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
