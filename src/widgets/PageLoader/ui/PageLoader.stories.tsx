import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { PageLoader } from './PageLoader';

export default {
    title: 'widget/PageLoader',
    component: PageLoader,
};

const Template: typeof PageLoader = (args) => <PageLoader {...args} />;

export const Light = Template.bind({});
export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
