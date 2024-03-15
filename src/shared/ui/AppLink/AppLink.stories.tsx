import { Story } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { AppLink, AppLinkThemes } from './AppLink';

// todo: add ComponentMeta type
export default {
    title: 'shared/AppLink',
    component: AppLink,
};

// todo: Change Story to StoryComponent
const Template: Story = (args) => <AppLink to="#" {...args} />;

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
    children: 'app link',
};
export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    ...PrimaryLight.args,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecondaryLight = Template.bind({});
SecondaryLight.args = {
    children: 'app link',
    theme: AppLinkThemes.SECONDARY,
};
export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
    ...SecondaryLight.args,
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
