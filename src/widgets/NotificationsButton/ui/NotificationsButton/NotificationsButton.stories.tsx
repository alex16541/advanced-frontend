import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { Notification, notification } from 'entity/Notification';
import { NotificationsButton } from './NotificationsButton';

const notifications: Notification[] = [
    { ...notification, id: '1' },
    { ...notification, id: '2' },
    { ...notification, id: '3' },
    { ...notification, id: '4' },
    { ...notification, id: '5' },
];

export default {
    title: 'widgets/NotificationsButton',
    component: NotificationsButton,
    args: {

    },
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
} as ComponentMeta<typeof NotificationsButton>;

const Template: ComponentStory<typeof NotificationsButton> = (args) => <NotificationsButton {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
