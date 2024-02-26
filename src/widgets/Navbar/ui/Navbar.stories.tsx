import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { UserRoles } from 'entity/User';
import { Navbar } from './Navbar';

export default {
    title: 'widgets/Navbar',
    component: Navbar,
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
                roles: [UserRoles.ADMIN],
                avatar: 'https://media.istockphoto.com/id/1269703326/vector/pixel-art-8-bit-cute-kitten-domestic-pet-saying-meow-isolated-vector.jpg?s=612x612&w=0&k=20&c=akgp8uPlUMGNZbnO-bTAksu7f1zER53qwEXExAMirko=',
            },
        },
    }),
];
