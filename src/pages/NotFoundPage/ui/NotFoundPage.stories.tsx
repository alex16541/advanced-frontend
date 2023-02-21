import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { NotFoundPage } from './NotFoundPage';

export default {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
};

const Template: typeof NotFoundPage = () => <NotFoundPage />;

export const Light = Template.bind({});
export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
