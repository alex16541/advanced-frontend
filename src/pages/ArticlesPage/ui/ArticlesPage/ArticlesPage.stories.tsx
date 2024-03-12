import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { article } from '@/entity/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import ArticlesPage from './ArticlesPage';

export default {
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
    args: {},
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
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => (
    <ArticlesPage {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
