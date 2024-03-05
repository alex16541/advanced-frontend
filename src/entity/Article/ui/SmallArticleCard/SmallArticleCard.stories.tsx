import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { SmallArticleCard } from './SmallArticleCard';
import { article } from '../../mock/data';

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
