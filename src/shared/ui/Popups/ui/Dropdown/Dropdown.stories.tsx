import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Dropdown } from './Dropdown';
import { Button } from '../../../Button';

export default {
    title: 'shared/Popups/Dropdown',
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
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
