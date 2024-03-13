import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { notification } from '../../mock/notification';

import { NotificationsList } from './NotificationsList';

const parameters = {
    mockData: [
        {
            url: `${__API__}/notifications?userId=1`,
            method: 'GET',
            status: 200,
            response: [
                { ...notification, id: '1' },
                { ...notification, id: '2' },
                { ...notification, id: '3' },
                { ...notification, id: '4' },
                { ...notification, id: '5' },
            ],
            delay: 1000,
        },
    ],
};

export default {
    title: 'entity/Notification/NotificationsList',
    component: NotificationsList,
    args: {
        userId: '1',
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
} as ComponentMeta<typeof NotificationsList>;

const Template: ComponentStory<typeof NotificationsList> = (args) => <NotificationsList {...args} />;

export const Light = Template.bind({});
Light.parameters = parameters;

export const Dark = Template.bind({});
Dark.parameters = parameters;
Dark.decorators = [ThemeDecorator(Theme.DARK)];
