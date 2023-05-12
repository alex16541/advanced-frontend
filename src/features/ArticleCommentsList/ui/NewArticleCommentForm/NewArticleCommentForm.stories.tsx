import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { NewArticleCommentForm } from './NewArticleCommentForm';

export default {
    title: 'folder/NewArticleCommentForm',
    component: NewArticleCommentForm,
    args: {},
} as ComponentMeta<typeof NewArticleCommentForm>;

const Template: ComponentStory<typeof NewArticleCommentForm> = (args) => (
    <NewArticleCommentForm {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
