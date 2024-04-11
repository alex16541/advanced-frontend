import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { SettingsPage } from './SettingsPage';

export default {
    title: 'folder/SettingsPage',
    component: SettingsPage,
} as Meta<typeof SettingsPage>;

type Story = StoryObj<typeof SettingsPage>

export const Light: Story = {};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.DARK)
    ]
}
