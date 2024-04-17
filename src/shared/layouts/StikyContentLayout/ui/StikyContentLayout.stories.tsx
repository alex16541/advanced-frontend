import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { StikyContentLayout } from './StikyContentLayout';

const styles = {
    background: '#444',
    color: '#fff',
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    flex: '1 1 auto',
};

export default {
    title: 'shared/layouts/StikyContentLayout',
    component: StikyContentLayout,
    args: {
        content: <div style={styles}>Content</div>,
        left: <div style={styles}>Left</div>,
        right: <div style={styles}>Right</div>,
    },
} as Meta<typeof StikyContentLayout>;

type Story = StoryObj<typeof StikyContentLayout>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
