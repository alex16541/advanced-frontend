import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Select } from './Select';

export default {
    title: 'shared/Select',
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
} as ComponentMeta<typeof Select>;

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
