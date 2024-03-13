import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { article } from '../../mock/data';

import { ArticlesList } from './ArticlesList';

const articles = new Array(9).fill(0).map((item, index) => ({
    ...article,
    id: index.toString(),
}));

export default {
    title: 'entity/Article/ArticlesList',
    component: ArticlesList,
    args: {
        articles,
    },
} as ComponentMeta<typeof ArticlesList>;

const Template: ComponentStory<typeof ArticlesList> = (args) => (
    <ArticlesList {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
