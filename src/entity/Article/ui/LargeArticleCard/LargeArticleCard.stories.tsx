import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { LargeArticleCard } from './LargeArticleCard';
import { article } from '../../mock/data';

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
