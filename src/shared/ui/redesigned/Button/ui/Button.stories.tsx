import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Button } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Button',
        theme: 'primary',
    },
};

export const PrimaryDark: Story = {
    args: {
        children: 'Button',
        theme: 'primary',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Secondary: Story = {
    args: {
        children: 'Button',
        theme: 'secondary',
    },
};

export const SecondaryDark: Story = {
    args: {
        children: 'Button',
        theme: 'secondary',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Clear: Story = {
    args: {
        ...Primary.args,
        theme: 'clear',
    },
};

export const ClearDark: Story = {
    args: {
        ...Primary.args,
        theme: 'clear',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Outlined: Story = {
    args: {
        ...Primary.args,
        theme: 'outlined',
    },
};

export const OutlinedDark: Story = {
    args: {
        ...Primary.args,
        theme: 'outlined',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const SizeS: Story = {
    args: {
        ...Primary.args,
        size: 'm',
    },
};

export const SizeM: Story = {
    args: {
        ...Primary.args,
        size: 'm',
    },
};

export const SizeL: Story = {
    args: {
        ...Primary.args,
        size: 'l',
    },
};

export const SizeXL: Story = {
    args: {
        ...Primary.args,
        size: 'xl',
    },
};

export const Disabled: Story = {
    args: {
        children: 'Button',
        theme: 'primary',
        disabled: true,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Loading: Story = {
    args: {
        children: 'Button',
        theme: 'primary',
        isLoading: true,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
