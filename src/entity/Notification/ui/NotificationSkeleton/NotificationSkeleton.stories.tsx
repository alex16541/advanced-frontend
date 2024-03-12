import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { NotificationSkeleton } from './NotificationSkeleton';

export default {
    title: 'entity/Notification/NotificationSkeleton',
    component: NotificationSkeleton,
    args: {

    },
} as ComponentMeta<typeof NotificationSkeleton>;

const Template: ComponentStory<typeof NotificationSkeleton> = (args) => <NotificationSkeleton {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
