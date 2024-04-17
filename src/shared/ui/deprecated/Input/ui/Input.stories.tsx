import { Story } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Input } from './Input';

export default {
    title: 'deprecated/shared/Input',
    component: Input,
    args: {
        value: 'Input text',
    },
    decorators: [ThemeDecorator(Theme.LIGHT), FeatureFlagsDecorator({ isRedesignedApp: false })],
};

const Template: Story = (args) => <Input {...args} />;

export const Light = Template.bind({});
export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const IsLoading = Template.bind({});
IsLoading.args = {
    isLoading: true,
};
