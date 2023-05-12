import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticleCommentsErrors } from 'features/ArticleCommentsList/model/types/articleCommentList';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import ArticleCommentsList from './ArticleCommentsList';

export default {
    title: 'features/ArticleCommentsList',
    component: ArticleCommentsList,
    args: {},
} as ComponentMeta<typeof ArticleCommentsList>;

const Template: ComponentStory<typeof ArticleCommentsList> = (args) => (
    <ArticleCommentsList {...args} />
);

export const Light = Template.bind({});
Light.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '2',
                profileId: '2',
                username: 'user',
                avatar: 'https://media.istockphoto.com/id/1269703326/vector/pixel-art-8-bit-cute-kitten-domestic-pet-saying-meow-isolated-vector.jpg?s=612x612&w=0&k=20&c=akgp8uPlUMGNZbnO-bTAksu7f1zER53qwEXExAMirko=',
            },
        },
        articleComments: {
            ids: ['1', '2', '3'],
            entities: {
                1: {
                    text: '(づ￣ 3￣)づ',
                    id: '1',
                    user: {
                        id: '1',
                        username: 'root',
                        profileId: '1',
                        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqiaLNuTp-jJ5Mj71QJeXTlVlc1UYIYNc4A&usqp=CAU',
                    },
                },
                2: {
                    text: 'o(一︿一+)o',
                    id: '2',
                    user: {
                        id: '1',
                        username: 'root',
                        profileId: '1',
                        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqiaLNuTp-jJ5Mj71QJeXTlVlc1UYIYNc4A&usqp=CAU',
                    },
                },
                3: {
                    text: '^_____^',
                    id: '3',
                    user: {
                        id: '2',
                        profileId: '2',
                        username: 'user',
                        avatar: 'https://media.istockphoto.com/id/1269703326/vector/pixel-art-8-bit-cute-kitten-domestic-pet-saying-meow-isolated-vector.jpg?s=612x612&w=0&k=20&c=akgp8uPlUMGNZbnO-bTAksu7f1zER53qwEXExAMirko=',
                    },
                },
            },
        },
    }),
];

export const Dark = Template.bind({});
Dark.decorators = [...Light.decorators, ThemeDecorator(Theme.DARK)];

export const Loading = Template.bind({});
Loading.decorators = [
    StoreDecorator({
        articleComments: {
            ids: [],
            entities: {},
            isLoading: true,
        },
    }),
    ThemeDecorator(Theme.DARK),
];

export const WithError = Template.bind({});
WithError.decorators = [
    StoreDecorator({
        articleComments: {
            ids: [],
            entities: {},
            error: [ArticleCommentsErrors.SERVER_ERROR],
        },
    }),
    ThemeDecorator(Theme.DARK),
];
