import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ArticleTypeChips } from './ArticleTypeChips';

export default {
    title: 'folder/ArticleTypeChips',
    component: ArticleTypeChips,
    args: {

    },
} as ComponentMeta<typeof ArticleTypeChips>;

const Template: ComponentStory<typeof ArticleTypeChips> = (args) => <ArticleTypeChips {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
