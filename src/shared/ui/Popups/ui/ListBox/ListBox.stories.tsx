import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ListBox } from './ListBox';

export default {
    title: 'shared/Popups/ListBox',
    component: ListBox,
    args: {
        options: [
            { value: 'option_1', content: 'Option 1' },
            { value: 'option_2', content: 'Option 2' },
            { value: 'option_3', content: 'Option 3' },
            { value: 'option_4', content: 'Option 4' },
            { value: 'option_5', content: 'Option 5' },
        ],
    },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Light = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = { ...Template.args, label: 'Выберите значение:' };

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
