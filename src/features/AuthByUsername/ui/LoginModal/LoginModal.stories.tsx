import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { LoginModal } from './LoginModal';

export default {
    title: 'features/LoginModal',
    component: LoginModal,
};

const Template: Story = (args) => <LoginModal {...args} />;

export const Light = Template.bind({});
Light.args = {
    isOpen: true,
};
Light.decorators = [
    StoreDecorator({
        loginForm: {
            username: '123',
            password: '123',
        },
    }),
];
export const Dark = Template.bind({});
Dark.args = {
    ...Light.args,
};
Dark.decorators = [ThemeDecorator(Theme.DARK), ...Light.decorators];
