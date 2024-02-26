import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ArticleSearch } from './ArticleSearch';

export default {
    title: 'features/ArticleSearch',
    component: ArticleSearch,
    args: {},
    decorators: [
        StoreDecorator({}),
    ],
} as ComponentMeta<typeof ArticleSearch>;

const Template: ComponentStory<typeof ArticleSearch> = (args) => (
    <ArticleSearch {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
