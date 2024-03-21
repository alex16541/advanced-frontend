import { Meta, StoryObj } from '@storybook/react';

import { Notification, notification } from '@/entity/Notification';
import { UserRoles } from '@/entity/User';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Navbar } from './Navbar';

const notifications: Notification[] = [
    { ...notification, id: '1' },
    { ...notification, id: '2' },
    { ...notification, id: '3' },
    { ...notification, id: '4' },
    { ...notification, id: '5' },
];

export default {
    title: 'widgets/Navbar',
    component: Navbar,
    parameters: {
        mockData: [
            {
                url: `${__API__}/notifications?userId=1`,
                method: 'GET',
                status: 200,
                response: notifications,
            },
        ],
    },
    decorators: [
        StoreDecorator({
            loginForm: {},
        }),
    ],
} as Meta<typeof Navbar>;

type Story = StoryObj<typeof Navbar>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const LogedIn: Story = {
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    id: '1',
                    roles: [UserRoles.ADMIN],
                    avatar: 'tests/Avatar.jpeg',
                },
            },
        }),
    ],
};
