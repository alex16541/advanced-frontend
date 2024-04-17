import { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { article } from '../../mock/data';

import { SmallArticleCard } from './SmallArticleCard';

export default {
    title: 'entity/Article/SmallArticleCard',
    component: SmallArticleCard,
    args: {
        article,
    },
    decorators: [ThemeDecorator(Theme.LIGHT), FeatureFlagsDecorator({ isRedesignedApp: false })],
} as Meta<typeof SmallArticleCard>;

type Story = StoryObj<typeof SmallArticleCard>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Loading: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
    args: { isLoading: true },
};
