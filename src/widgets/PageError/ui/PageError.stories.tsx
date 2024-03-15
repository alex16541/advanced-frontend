import { Story } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { PageError } from './PageError';

export default {
    title: 'widgets/PageError',
    component: PageError,
};

const Template: Story = (args) => <PageError {...args} />;

export const Light = Template.bind({});
export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
