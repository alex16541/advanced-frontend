import { StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { LoginModal } from './LoginModal';

export default {
    title: 'features/LoginModal',
    component: LoginModal,
    decorators: [
        StoreDecorator({
            loginForm: {
                username: '123',
                password: '123',
            },
        }),
    ],
};

type Story = StoryObj<typeof LoginModal>;

export const Light: Story = {
    args: {
        isOpen: true,
    },
};

export const Dark: Story = {
    args: {
        isOpen: true,
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
