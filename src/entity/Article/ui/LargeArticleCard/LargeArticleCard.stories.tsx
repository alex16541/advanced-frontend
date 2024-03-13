import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { article } from '../../mock/data';

import { LargeArticleCard } from './LargeArticleCard';

export default {
    title: 'entity/Article/LargeArticleCard',
    component: LargeArticleCard,
    args: {
        article,
    },
} as ComponentMeta<typeof LargeArticleCard>;

const Template: ComponentStory<typeof LargeArticleCard> = (args) => (
    <LargeArticleCard {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Loading = Template.bind({});
Loading.decorators = [ThemeDecorator(Theme.DARK)];
Loading.args = { ...Loading.args, isLoading: true };
