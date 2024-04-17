import { Story } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { AppLink, AppLinkThemes } from './AppLink';

// todo: add Meta type
export default {
    title: 'deprecated/shared/AppLink',
    component: AppLink,
    decorators: [ThemeDecorator(Theme.LIGHT), FeatureFlagsDecorator({ isRedesignedApp: false })],
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
