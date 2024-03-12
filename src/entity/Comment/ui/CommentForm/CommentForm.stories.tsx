import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { CommentForm } from './CommentForm';

export default {
    title: 'entity/Comment/CommentForm',
    component: CommentForm,
    args: {},
} as ComponentMeta<typeof CommentForm>;

const Template: ComponentStory<typeof CommentForm> = (args) => (
    <CommentForm {...args} />
);

export const Light = Template.bind({});
Light.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                username: 'user123',
                profileId: '1',
                avatar: 'https://media.istockphoto.com/id/1269703326/vector/pixel-art-8-bit-cute-kitten-domestic-pet-saying-meow-isolated-vector.jpg?s=612x612&w=0&k=20&c=akgp8uPlUMGNZbnO-bTAksu7f1zER53qwEXExAMirko=',
            },
        },
    }),
];

export const Dark = Template.bind({});
Dark.decorators = [...Light.decorators, ThemeDecorator(Theme.DARK)];
