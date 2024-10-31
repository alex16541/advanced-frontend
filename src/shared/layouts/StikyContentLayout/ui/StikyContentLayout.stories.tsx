import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';
import { Card } from '@/shared/ui/redesigned/Card';

import { StikyContentLayout } from './StikyContentLayout';

const styles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export default {
    title: 'shared/layouts/StikyContentLayout',
    component: StikyContentLayout,
    args: {
        content: (
            <Card style={{ ...styles, height: '300vh', alignItems: 'flex-start' }}>Scrollable content</Card>
        ),
        left: <Card style={styles}>Left</Card>,
        right: <Card style={styles}>Right</Card>,
    },
} as Meta<typeof StikyContentLayout>;

type Story = StoryObj<typeof StikyContentLayout>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
