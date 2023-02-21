import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { ThemeSwitcher } from './ThemeSwitcher';

export default {
    title: 'widget/ThemeSwitcher',
    component: ThemeSwitcher,
};

const Template: typeof ThemeSwitcher = (args) => <ThemeSwitcher {...args} />;

export const Light = Template.bind({});
export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
