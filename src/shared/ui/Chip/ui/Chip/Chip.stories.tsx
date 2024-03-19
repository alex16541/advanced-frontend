import { Meta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Chip } from './Chip';

export default {
    title: 'shared/Chip/Chip',
    component: Chip,
    args: {
        value: 'chip',
        label: 'Chip content',
    },
} as Meta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const SelectedLight = Template.bind({});
SelectedLight.args = {
    value: 'chip',
    label: 'Chip content',
    selected: true,
};

export const SelectedDark = Template.bind({});
SelectedDark.decorators = [ThemeDecorator(Theme.DARK)];
SelectedDark.args = {
    value: 'chip',
    label: 'Chip content',
    selected: true,
};
