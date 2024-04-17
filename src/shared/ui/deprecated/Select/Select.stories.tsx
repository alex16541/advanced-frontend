import { Meta, ComponentStory } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Select } from './Select';

export default {
    title: 'deprecated/shared/Select',
    component: Select,
    args: {
        options: [
            { value: '1', content: 'option 1' },
            { value: '2', content: 'option 2' },
            { value: '3', content: 'option 3' },
            { value: '4', content: 'option 4' },
            { value: '5', content: 'option 5' },
        ],
    },
    decorators: [ThemeDecorator(Theme.LIGHT), FeatureFlagsDecorator({ isRedesignedApp: false })],
} as Meta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithLabelLight = Template.bind({});
WithLabelLight.args = {
    label: 'Select label',
};

export const WithLabelDark = Template.bind({});
WithLabelDark.decorators = [ThemeDecorator(Theme.DARK)];
WithLabelDark.args = {
    label: 'Select label',
};
