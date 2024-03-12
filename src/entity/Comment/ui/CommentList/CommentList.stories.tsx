import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { CommentList } from './CommentList';

export default {
    title: 'entity/Comment/CommentList',
    component: CommentList,
    args: {
        comments: [
            {
                text: '(づ￣ 3￣)づ',
                id: '1',
                user: {
                    id: '1',
                    username: 'root',
                    profileId: '1',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqiaLNuTp-jJ5Mj71QJeXTlVlc1UYIYNc4A&usqp=CAU',
                },
            },
            {
                text: 'o(一︿一+)o',
                id: '2',
                user: {
                    id: '1',
                    username: 'root',
                    profileId: '1',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqiaLNuTp-jJ5Mj71QJeXTlVlc1UYIYNc4A&usqp=CAU',
                },
            },
            {
                text: '^_____^',
                id: '3',
                user: {
                    id: '2',
                    profileId: '2',
                    username: 'user',
                    avatar: 'https://media.istockphoto.com/id/1269703326/vector/pixel-art-8-bit-cute-kitten-domestic-pet-saying-meow-isolated-vector.jpg?s=612x612&w=0&k=20&c=akgp8uPlUMGNZbnO-bTAksu7f1zER53qwEXExAMirko=',
                },
            },
        ],
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
    <CommentList {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
