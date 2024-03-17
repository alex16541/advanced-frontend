import { ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import ArticleRating from './ArticleRating';

export default {
    title: 'features/Article/ArticleRating',
    component: ArticleRating,
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    id: '1',
                },
            },
        }),
    ],
} as ComponentMeta<typeof ArticleRating>;

export const Light = {
    args: {
        articleId: '1',
    },
    parameters: {
        mockData: [
            {
                url: `${__API__}/articles-rating?articleId=1&userId=1`,
                method: 'GET',
                status: 200,
                response: [
                    {
                        id: '1',
                        articleId: '1',
                        userId: '1',
                        rating: '3',
                        feedback: 'Good',
                    },
                ],
            },
        ],
    },
};
export const Dark = {
    ...Light,
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const WithoutRating = {
    args: {
        articleId: '2',
    },
    parameters: {
        mockData: [
            {
                url: `${__API__}/articles-rating?articleId=2&userId=1`,
                method: 'GET',
                status: 200,
                response: [

                ],
            },
        ],
    },
};
