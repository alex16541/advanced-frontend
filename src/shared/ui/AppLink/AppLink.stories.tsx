import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { AppLink, AppLinkThemes } from './AppLink';

export default {
    title: 'shared/AppLink',
    component: AppLink,
};

const Template: typeof AppLink = (args) => <AppLink {...args} />;

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
    to: '#',
    children: 'app link',
};
export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    ...PrimaryLight.args,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecondaryLight = Template.bind({});
SecondaryLight.args = {
    to: '#',
    children: 'app link',
    theme: AppLinkThemes.SECONDARY,
};
export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
    ...SecondaryLight.args,
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
