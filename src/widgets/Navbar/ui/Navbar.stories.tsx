import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
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
        user: { authData: {} },
    }),
];
