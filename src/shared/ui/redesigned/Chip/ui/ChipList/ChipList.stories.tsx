import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ChipList } from './ChipList';

const options = [
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
];

export default {
    title: 'shared/Chip/ChipList',
    component: ChipList,
    args: {
        options,
    },
} as Meta<typeof ChipList>;

type Story = StoryObj<typeof ChipList>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Selected = {
    args: {
        options: [
            ...options,
            {
                value: 'chip4',
                label: 'Chip #4',
                selected: true,
            },
        ],
    },
};
