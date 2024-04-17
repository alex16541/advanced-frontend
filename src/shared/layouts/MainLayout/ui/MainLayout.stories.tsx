import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { MainLayout } from './MainLayout';

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
    title: 'shared/layouts/MainLayout',
    component: MainLayout,
    args: {
        content: <div style={styles}>Content</div>,
        sidebar: <div style={styles}>Sidebar</div>,
        navbar: <div style={styles}>Navbar</div>,
        toolbar: <div style={styles}>Toolbar</div>,
    },
} as Meta<typeof MainLayout>;

type Story = StoryObj<typeof MainLayout>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
