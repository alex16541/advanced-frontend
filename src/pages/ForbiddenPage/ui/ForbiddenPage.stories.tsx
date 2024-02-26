import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { NotFoundPage } from './ForbiddenPage';

export default {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
};

const Template: Story = () => <NotFoundPage />;

export const Light = Template.bind({});
export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
