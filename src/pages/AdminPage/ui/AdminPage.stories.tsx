import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { AdminPage } from './AdminPage';

export default {
    title: 'folder/AdminPage',
    component: AdminPage,
    args: {

    },
} as ComponentMeta<typeof AdminPage>;

const Template: ComponentStory<typeof AdminPage> = (args) => <AdminPage {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
