import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Loader } from './Loader';

export default {
    title: 'shared/Loader',
    component: Loader,
};

const Template: Story = (args) => <Loader {...args} />;

export const Light = Template.bind({});
export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
