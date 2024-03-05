import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Skeleton } from './Skeleton';

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    args: {
        width: '100%',
        height: 300,
    },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
    <Skeleton {...args} />
);

export const Light = Template.bind({});
export const Sircle = Template.bind({});
Sircle.args = { width: 100, height: 100, border: '50%' };

export const SircleDark = Template.bind({});
SircleDark.args = Sircle.args;
SircleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
