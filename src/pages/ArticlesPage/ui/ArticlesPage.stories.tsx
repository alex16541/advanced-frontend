import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { article } from 'entity/Article/mock/data';
import ArticlesPage from './ArticlesPage';

export default {
    title: 'folder/ArticlesPage',
    component: ArticlesPage,
    args: {},
} as ComponentMeta<typeof ArticlesPage>;

const articles = new Array(9).fill(article);
const Template: ComponentStory<typeof ArticlesPage> = (args) => (
    <ArticlesPage {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
