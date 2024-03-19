import { Meta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { notification } from '../../mock/notification';

import { NotificationsItem } from './NotificationsItem';

export default {
    title: 'entity/Notification/NotificationsItem',
    component: NotificationsItem,
    args: {
        notification,
    },
} as Meta<typeof NotificationsItem>;

const Template: ComponentStory<typeof NotificationsItem> = (args) => <NotificationsItem {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
