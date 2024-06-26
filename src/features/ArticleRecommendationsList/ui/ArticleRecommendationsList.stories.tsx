import { Meta, ComponentStory } from '@storybook/react';

import { article } from '@/entity/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const articles = new Array(6).fill(0).map((item, index) => ({
    ...article,
    id: index.toString(),
}));

export default {
    title: 'features/Article/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    args: {},
    decorators: [StoreDecorator({})],
    parameters: {
        mockData: [
            {
                url: `${__API__}/articles?_page=1&_limit=6&_extend=user`,
                method: 'GET',
                status: 200,
                response: articles,
            },
        ],
    },
} as Meta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
    <ArticleRecommendationsList {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
