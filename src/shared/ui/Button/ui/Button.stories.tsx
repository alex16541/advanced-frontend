import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Button, ButtonThemes } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
};

const Template: typeof Button = (args) => <Button {...args} />;

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