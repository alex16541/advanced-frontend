import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import AboutPage from './AboutPage';

export default {
    title: 'pages/AboutPage',
    component: AboutPage,
};

const Template: typeof AboutPage = () => <AboutPage />;

export const Light = Template.bind({});
export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
