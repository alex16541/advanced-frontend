import { Meta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { article } from '../../mock/data';

import { ArticlesListItem, ArticlesListItemSize } from './ArticlesListItem';

export default {
    title: 'entity/Article/ArticlesListItem',
    component: ArticlesListItem,
    args: {
        article,
    },
} as Meta<typeof ArticlesListItem>;

const Template: ComponentStory<typeof ArticlesListItem> = (args) => (
    <ArticlesListItem {...args} />
);

export const LightSmall = Template.bind({});

export const DarkSmall = Template.bind({});
DarkSmall.decorators = [ThemeDecorator(Theme.DARK)];

export const LightLarge = Template.bind({});
LightLarge.args = { ...LightSmall.args, size: ArticlesListItemSize.L };

export const DarkLarge = Template.bind({});
DarkLarge.decorators = [ThemeDecorator(Theme.DARK)];
DarkLarge.args = { ...LightSmall.args, size: ArticlesListItemSize.L };
