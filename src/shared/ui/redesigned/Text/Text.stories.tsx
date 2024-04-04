import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Text } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
} as Meta<typeof Text>;

type Story = StoryObj<typeof Text>;

export const PrimaryLight: Story = {
    args: {
        title: 'Text tiele',
        text: 'Some text....',
        theme: 'primary',
    },
};

export const PrimaryDark: Story = {
    args: {
        ...PrimaryLight.args,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const RedLight: Story = {
    args: {
        ...PrimaryLight.args,
        theme: 'error',
    },
};

export const RedDark: Story = {
    args: {
        ...PrimaryLight.args,
        theme: 'error',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const SecondaryLight: Story = {
    args: {
        ...PrimaryLight.args,
        theme: 'secondary',
    },
};

export const SecondaryDark: Story = {
    args: {
        ...PrimaryLight.args,
        theme: 'error',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const OnlyTitle: Story = {
    args: {
        title: 'Text tiele',
        theme: 'primary',
    },
};

export const OnlyText: Story = {
    args: {
        text: 'Some text....',
        theme: 'primary',
    },
};

export const SizeS: Story = {
    args: {
        ...PrimaryLight.args,
        size: 's',
    },
};

export const SizeL: Story = {
    args: {
        ...PrimaryLight.args,
        size: 'l',
    },
};
