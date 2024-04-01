import { Story } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Text, TextSize, TextThemes } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
};

const Template: Story = (args) => <Text {...args} />;

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
    title: 'Text tiele',
    text: 'Some text....',
    theme: TextThemes.PRIMARY,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    ...PrimaryLight.args,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const RedLight = Template.bind({});
RedLight.args = {
    ...PrimaryLight.args,
    theme: TextThemes.ERROR,
};

export const RedDark = Template.bind({});
RedDark.args = {
    ...PrimaryLight.args,
    theme: TextThemes.ERROR,
};
RedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ContrastLight = Template.bind({});
ContrastLight.args = {
    ...PrimaryLight.args,
    theme: TextThemes.CONTRAST,
};

export const ContrastDark = Template.bind({});
ContrastDark.args = {
    ...PrimaryLight.args,
    theme: TextThemes.ERROR,
};
ContrastDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'Text tiele',
    theme: TextThemes.PRIMARY,
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'Some text....',
    theme: TextThemes.PRIMARY,
};

export const SizeS = Template.bind({});
SizeS.args = {
    ...PrimaryLight.args,
    size: TextSize.S,
};

export const SizeL = Template.bind({});
SizeL.args = {
    ...PrimaryLight.args,
    size: TextSize.L,
};
