import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { ArticlesList } from './ArticlesList';
import { article } from '../../mock/data';

const articles = new Array(9).fill(article);

export default {
    title: 'folder/ArticlesList',
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
