import { Meta, StoryObj } from '@storybook/react';

import { article } from '@/entity/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { articlesPageReducer } from '../../model/slices/articlesPageSlice';

import ArticlesPage from './ArticlesPage';

export default {
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
    decorators: [
        StoreDecorator({
            articlesPage: {
                ids: ['1', '2', '3'],
                entities: {
                    1: { ...article, id: '1' },
                    2: { ...article, id: '2' },
                    3: { ...article, id: '3' },
                },
            },
        }, {
            articlesPage: articlesPageReducer,
        }),
    ],
} as Meta<typeof ArticlesPage>;

type Story = StoryObj<typeof ArticlesPage>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
