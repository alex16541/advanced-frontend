import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Button } from '../../../Button';

import { Dropdown } from './Dropdown';

export default {
    title: 'shared/Popups/Dropdown',
    component: Dropdown,
    args: {
        button: <Button>Menu</Button>,
        items: [
            { content: 'item 1', onClick: () => {} },
            { content: 'item 2', onClick: () => {} },
            { content: 'item 3', onClick: () => {} },
            { isDelimiter: true },
            { content: 'item link 1', href: '#' },
            { content: 'item link 2', href: '#' },
        ],
    },
} as Meta<typeof Dropdown>;

type Story = StoryObj<typeof Dropdown>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
