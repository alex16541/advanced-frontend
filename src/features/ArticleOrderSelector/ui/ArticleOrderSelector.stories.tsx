import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleOrderSelector } from './ArticleOrderSelector';

export default {
    title: 'folder/ArticleOrderSelector',
    component: ArticleOrderSelector,
    args: {

    },
} as ComponentMeta<typeof ArticleOrderSelector>;

const Template: ComponentStory<typeof ArticleOrderSelector> = (args) => <ArticleOrderSelector {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
