import { Meta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Text } from '../Text/Text';

import { Card } from './Card';

export default {
    title: 'shared/Card',
    component: Card,
    args: {
        children: <Text text="Some card with text" />,
    },
} as Meta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
