import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import LoginForm from './LoginForm';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    args: {},
    decorators: [
        StoreDecorator({
            loginForm: {
                username: '123',
                password: '123',
            },
        }),
    ],
} as Meta<typeof LoginForm>;

type Story = StoryObj<typeof LoginForm>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const WithError: Story = {
    decorators: [
        StoreDecorator({
            loginForm: {
                username: '123',
                password: '123',
                error: 0,
            },
        }),
    ],
};
