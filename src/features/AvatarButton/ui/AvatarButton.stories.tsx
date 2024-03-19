import { Meta, StoryObj } from '@storybook/react';

import { UserRoles } from '@/entity/User';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { AvatarButton } from './AvatarButton';

export default {
    title: 'features/AvatarButton',
    component: AvatarButton,
    args: {
        direction: 'bottom right',
    },
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    id: '1',
                    username: 'user123',
                    profileId: '1',
                    avatar: 'tests/Avatar.jpeg',
                    roles: [UserRoles.ADMIN],
                },
            },
        }),
    ],
} as Meta<typeof AvatarButton>;

type Story = StoryObj<typeof AvatarButton>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
