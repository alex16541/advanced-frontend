import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import ArticleCreatePage from './ArticleCreatePage';

export default {
    title: 'pages/ArticleCreatePage',
    component: ArticleCreatePage,
    args: {},
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    id: '1',
                    username: 'Vasya_123',
                    profileId: '1',
                    avatar: 'tests/Avatar.jpeg',
                },
            },
        }),
    ],
} as Meta<typeof ArticleCreatePage>;

type Story = StoryObj<typeof ArticleCreatePage>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
