import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import MainPage from './MainPage';

export default {
    title: 'pages/MainPage',
    component: MainPage,
};

const Template: typeof MainPage = () => <MainPage />;

export const Light = Template.bind({});
export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
