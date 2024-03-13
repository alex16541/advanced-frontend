import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { ArticleViewSwitcher } from './ArticleViewSwitcher';

export default {
    title: 'entity/Article/ArticleViewSwitcher',
    component: ArticleViewSwitcher,
    args: {},
} as ComponentMeta<typeof ArticleViewSwitcher>;

const Template: ComponentStory<typeof ArticleViewSwitcher> = (args) => (
    <ArticleViewSwitcher {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
