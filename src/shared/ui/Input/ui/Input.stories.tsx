import { Story } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Input } from './Input';

export default {
    title: 'shared/Input',
    component: Input,
};

const Template: Story = (args) => <Input {...args} />;

export const Light = Template.bind({});
Light.args = {
    value: 'input text',
};
export const Dark = Template.bind({});
Dark.args = {
    ...Light.args,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
