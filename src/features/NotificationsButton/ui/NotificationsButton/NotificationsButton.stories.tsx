import { Meta, ComponentStory } from '@storybook/react';

import { Notification, notification } from '@/entity/Notification';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { NotificationsButton } from './NotificationsButton';

const notifications: Notification[] = [
    { ...notification, id: '1' },
    { ...notification, id: '2' },
    { ...notification, id: '3' },
    { ...notification, id: '4' },
    { ...notification, id: '5' },
];

export default {
    title: 'features/NotificationsButton',
    component: NotificationsButton,
    args: {},
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    id: '1',
                },
            },
        }),
    ],
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
} as Meta<typeof NotificationsButton>;

const Template: ComponentStory<typeof NotificationsButton> = (args) => <NotificationsButton {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
