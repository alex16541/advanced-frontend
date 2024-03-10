import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import ArticleRating from './ArticleRating';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

const parameters = {
    mockData: [
        {
            url: `${__API__}/articles-rating?articleId=1&userId=1`,
            method: 'GET',
            status: 200,
            response: [{
                id: '1',
                articleId: '1',
                userId: '1',
                rating: '3',
                feedback: 'Good',
            }],
        },
    ],
};

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    args: {
        articleId: '1',
    },
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

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const Light = Template.bind({});
Light.parameters = parameters;

export const Dark = Template.bind({});
Dark.parameters = parameters;
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithoutRating = Template.bind({});
