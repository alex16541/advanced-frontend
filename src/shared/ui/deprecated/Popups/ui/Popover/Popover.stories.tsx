import { Meta, ComponentStory } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Popover } from './Popover';

export default {
    title: 'deprecated/shared/Popups/Popover',
    component: Popover,
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT), FeatureFlagsDecorator({ isRedesignedApp: false })],
} as Meta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
