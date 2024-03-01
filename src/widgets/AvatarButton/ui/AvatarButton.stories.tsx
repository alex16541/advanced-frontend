import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { UserRoles } from 'entity/User';
import { AvatarButton } from './AvatarButton';

export default {
    title: 'widgets/AvatarButton',
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
                    avatar: 'https://media.istockphoto.com/id/1269703326/vector/pixel-art-8-bit-cute-kitten-domestic-pet-saying-meow-isolated-vector.jpg?s=612x612&w=0&k=20&c=akgp8uPlUMGNZbnO-bTAksu7f1zER53qwEXExAMirko=',
                    roles: [UserRoles.ADMIN],
                },
            },
        }),
    ],
} as ComponentMeta<typeof AvatarButton>;

const Template: ComponentStory<typeof AvatarButton> = (args) => <AvatarButton {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
