import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { PageError } from './PageError';

export default {
    title: 'widget/PageError',
    component: PageError,
};

const Template: typeof PageError = (args) => <PageError {...args} />;

export const Light = Template.bind({});
export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
