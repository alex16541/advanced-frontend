import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { UserRoles } from 'entity/User';
import { Notification, notification } from 'entity/Notification';
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
};

const Template: Story = (args) => <Navbar {...args} />;

export const Light = Template.bind({});
Light.decorators = [
    StoreDecorator({
        loginForm: {},
    }),
];
export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK), ...Light.decorators];

export const LogedIn = Template.bind({});
LogedIn.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                roles: [UserRoles.ADMIN],
                avatar: 'https://media.istockphoto.com/id/1269703326/vector/pixel-art-8-bit-cute-kitten-domestic-pet-saying-meow-isolated-vector.jpg?s=612x612&w=0&k=20&c=akgp8uPlUMGNZbnO-bTAksu7f1zER53qwEXExAMirko=',
            },
        },
    }),
];
