import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
};

const Template: typeof ProfilePage = () => <ProfilePage />;

export const Light = Template.bind({});
Light.decorators = [StoreDecorator({})];
export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK), ...Light.decorators];
