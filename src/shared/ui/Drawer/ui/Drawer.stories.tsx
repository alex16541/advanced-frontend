import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Drawer } from './Drawer';
import { Text } from '../../Text/Text';

export default {
    title: 'shared/Drawer',
    component: Drawer,
    args: {
        isOpen: true,
        children: <Text title="Some content of a drawer" />,
    },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
