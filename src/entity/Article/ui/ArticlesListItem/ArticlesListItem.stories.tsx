import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { ArticlesListItem, ArticlesListItemSize } from './ArticlesListItem';
import { article } from '../../mock/data';

export default {
    title: 'entity/Article/ArticlesListItem',
    component: ArticlesListItem,
    args: {
        article,
    },
} as ComponentMeta<typeof ArticlesListItem>;

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
