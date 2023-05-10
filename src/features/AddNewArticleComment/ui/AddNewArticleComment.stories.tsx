import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { AddNewArticleComment } from './AddNewArticleComment';

export default {
    title: 'folder/AddNewArticleComment',
    component: AddNewArticleComment,
    args: {},
} as ComponentMeta<typeof AddNewArticleComment>;

const Template: ComponentStory<typeof AddNewArticleComment> = (args) => (
    <AddNewArticleComment {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
