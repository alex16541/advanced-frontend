import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { article } from '../../mock/data';

import { SmallArticleCard } from './SmallArticleCard';

export default {
    title: 'entity/Article/SmallArticleCard',
    component: SmallArticleCard,
    args: {
        article,
    },
} as ComponentMeta<typeof SmallArticleCard>;

const Template: ComponentStory<typeof SmallArticleCard> = (args) => (
    <SmallArticleCard {...args} />
);

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
