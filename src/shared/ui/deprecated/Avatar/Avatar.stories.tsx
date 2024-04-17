import { Meta, ComponentStory } from '@storybook/react';

import AvatarImg from '@/shared/assets/tests/Avatar.jpeg';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Avatar } from './Avatar';

export default {
    title: 'deprecated/shared/Avatar',
    component: Avatar,
    args: {
        src: AvatarImg,
        size: 100,
        alt: 'avatar image',
    },
    decorators: [ThemeDecorator(Theme.LIGHT), FeatureFlagsDecorator({ isRedesignedApp: false })],
} as Meta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Rounded = Template.bind({});
Rounded.args = {
    rounded: true,
};
Rounded.decorators = [ThemeDecorator(Theme.DARK)];
