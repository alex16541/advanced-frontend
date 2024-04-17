import { Meta, ComponentStory } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { StarRating } from './StarRating';

export default {
    title: 'deprecated/shared/StarRating',
    component: StarRating,
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT), FeatureFlagsDecorator({ isRedesignedApp: false })],
} as Meta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => <StarRating {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
