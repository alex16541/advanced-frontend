import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Sidebar } from './Sidebar';

export default {
    title: 'widgets/Sidebar',
    component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Light = Template.bind({});
Light.decorators = [StoreDecorator({
    user: {
        authData: {},
    },
})];

export const Dark = Template.bind({});
Dark.decorators = [...Light.decorators, ThemeDecorator(Theme.DARK)];

export const NoAuth = Template.bind({});
NoAuth.decorators = [StoreDecorator({
    user: {

    },
})];
