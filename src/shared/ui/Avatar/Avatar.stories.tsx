import { ComponentMeta, ComponentStory } from '@storybook/react';

import AvatarImg from '@/shared/assets/tests/Avatar.jpeg';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Avatar } from './Avatar';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    args: {
        src: AvatarImg,
        size: 100,
        alt: 'avatar image',
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Rounded = Template.bind({});
Rounded.args = {
    rounded: true,
};
Rounded.decorators = [ThemeDecorator(Theme.DARK)];
