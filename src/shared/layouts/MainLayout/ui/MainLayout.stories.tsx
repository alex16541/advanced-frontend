import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';
import { Card } from '@/shared/ui/redesigned/Card';

import { MainLayout } from './MainLayout';

const styles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export default {
    title: 'shared/layouts/MainLayout',
    component: MainLayout,
    args: {
        content: <Card style={{ ...styles, height: '300vh', alignItems: 'flex-start' }}>Content</Card>,
        sidebar: <Card style={styles}>Sidebar</Card>,
        navbar: <Card style={styles}>Navbar</Card>,
        toolbar: <Card style={styles}>Toolbar</Card>,
    },
} as Meta<typeof MainLayout>;

type Story = StoryObj<typeof MainLayout>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
