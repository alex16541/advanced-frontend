import { Meta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { NotificationSkeleton } from './NotificationSkeleton';

export default {
    title: 'entity/Notification/NotificationSkeleton',
    component: NotificationSkeleton,
    args: {},
} as Meta<typeof NotificationSkeleton>;

const Template: ComponentStory<typeof NotificationSkeleton> = (args) => <NotificationSkeleton {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
