import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { ChipList } from './ChipList';

export default {
    title: 'shared/Chip/ChipList',
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
} as ComponentMeta<typeof ChipList>;

const Template: ComponentStory<typeof ChipList> = (args) => (
    <ChipList {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
