import { Meta, ComponentStory } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Skeleton } from './Skeleton';

export default {
    title: 'deprecated/shared/Skeleton',
    component: Skeleton,
    args: {
        width: '100%',
        height: 300,
    },
    decorators: [ThemeDecorator(Theme.LIGHT), FeatureFlagsDecorator({ isRedesignedApp: false })],
} as Meta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Light = Template.bind({});
export const Sircle = Template.bind({});
Sircle.args = { width: 100, height: 100, border: '50%' };

export const SircleDark = Template.bind({});
SircleDark.args = Sircle.args;
SircleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
