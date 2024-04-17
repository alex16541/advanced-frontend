import { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { article } from '../../mock/data';

import { LargeArticleCard } from './LargeArticleCard';

export default {
    title: 'entity/Article/LargeArticleCard',
    component: LargeArticleCard,
    args: {
        article,
    },
    decorators: [ThemeDecorator(Theme.LIGHT), FeatureFlagsDecorator({ isRedesignedApp: false })],
} as Meta<typeof LargeArticleCard>;

type Story = StoryObj<typeof LargeArticleCard>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Loading: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
    args: { isLoading: true },
};
