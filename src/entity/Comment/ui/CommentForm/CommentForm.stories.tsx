import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { CommentForm } from './CommentForm';

export default {
    title: 'entity/Comment/CommentForm',
    component: CommentForm,
    args: {},
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    id: '1',
                    username: 'user123',
                    profileId: '1',
                    avatar: 'tests/Avatar.jpeg',
                },
            },
        }),
    ],
} as Meta<typeof CommentForm>;

type Story = StoryObj<typeof CommentForm>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
