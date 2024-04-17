import { Meta, ComponentStory } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ChipList } from './ChipList';

export default {
    title: 'deprecated/shared/Chip/ChipList',
    component: ChipList,
    args: {
        options: [
            {
                value: 'chip1',
                label: 'Chip #1',
            },
            {
                value: 'chip2',
                label: 'Chip #2',
            },
            {
                value: 'chip3',
                label: 'Chip #3',
            },
        ],
    },
    decorators: [ThemeDecorator(Theme.LIGHT), FeatureFlagsDecorator({ isRedesignedApp: false })],
} as Meta<typeof ChipList>;

const Template: ComponentStory<typeof ChipList> = (args) => <ChipList {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
