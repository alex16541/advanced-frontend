import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { SettingsPage } from './SettingsPage';

export default {
    title: 'pages/SettingsPage',
    component: SettingsPage,
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    id: '2',
                },
            },
        }),
    ],
} as Meta<typeof SettingsPage>;

type Story = StoryObj<typeof SettingsPage>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
