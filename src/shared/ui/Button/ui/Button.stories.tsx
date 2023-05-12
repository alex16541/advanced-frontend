import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Button, ButtonSize, ButtonThemes } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
};

const Template: Story = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Button',
    theme: ButtonThemes.PRIMARY,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: 'Button',
    theme: ButtonThemes.PRIMARY,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'Button',
    theme: ButtonThemes.SECONDARY,
};

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
    children: 'Button',
    theme: ButtonThemes.SECONDARY,
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Clear = Template.bind({});
Clear.args = {
    ...Primary.args,
    theme: ButtonThemes.CLEAR,
};

export const ClearDark = Template.bind({});
ClearDark.args = {
    ...Primary.args,
    theme: ButtonThemes.CLEAR,
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Outlined = Template.bind({});
Outlined.args = {
    ...Primary.args,
    theme: ButtonThemes.OUTLINED,
};

export const OutlinedDark = Template.bind({});
OutlinedDark.args = {
    ...Primary.args,
    theme: ButtonThemes.OUTLINED,
};
OutlinedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeM = Template.bind({});
SizeM.args = {
    ...Primary.args,
    size: ButtonSize.M,
};

export const SizeL = Template.bind({});
SizeL.args = {
    ...Primary.args,
    size: ButtonSize.L,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
    ...Primary.args,
    size: ButtonSize.XL,
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'Button',
    theme: ButtonThemes.PRIMARY,
    disabled: true,
};
Disabled.decorators = [ThemeDecorator(Theme.DARK)];

export const Loading = Template.bind({});
Loading.args = {
    children: 'Button',
    theme: ButtonThemes.PRIMARY,
    isLoading: true,
};
Loading.decorators = [ThemeDecorator(Theme.DARK)];
