import { Meta, ComponentStory } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Button } from '../../../Button';

import { Dropdown } from './Dropdown';

export default {
    title: 'deprecated/shared/Popups/Dropdown',
    component: Dropdown,
    args: {
        button: <Button>Menu</Button>,
        items: [
            { content: 'item 1', onClick: () => {} },
            { content: 'item 2', onClick: () => {} },
            { content: 'item 3', onClick: () => {} },
            { content: 'item link 1', href: '#' },
            { content: 'item link 2', href: '#' },
        ],
    },
    decorators: [ThemeDecorator(Theme.LIGHT), FeatureFlagsDecorator({ isRedesignedApp: false })],
} as Meta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
