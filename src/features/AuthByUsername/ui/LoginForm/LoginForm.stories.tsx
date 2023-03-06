import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { LoginForm } from './LoginForm';
import { StoreDecorator } from '../../../../shared/config/storybook/StoreDecorator';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
};

const Template: typeof LoginForm = (args) => <LoginForm {...args} />;

export const Light = Template.bind({});
Light.args = {
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

export const WithError = Template.bind({});
WithError.args = {
};
WithError.decorators = [
    StoreDecorator({
        loginForm: {
            username: '123',
            password: '123',
            error: 0,
        },
    }),
];
