import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { ArticleCommentsList } from './ArticleCommentsList';

export default {
    title: 'folder/ArticleCommentsList',
    component: ArticleCommentsList,
    args: {},
} as ComponentMeta<typeof ArticleCommentsList>;

const Template: ComponentStory<typeof ArticleCommentsList> = (args) => (
    <ArticleCommentsList {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
