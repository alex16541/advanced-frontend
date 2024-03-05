import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { article } from '@/entity/Article';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const articles = new Array(6).fill(0).map((item, index) => ({
    ...article,
    id: index.toString(),
}));

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    args: {},
    decorators: [
        StoreDecorator({}),
    ],
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
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
