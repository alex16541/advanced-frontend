import { Meta, ComponentStory } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ListBox } from './ListBox';

export default {
    title: 'deprecated/shared/Popups/ListBox',
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
    decorators: [ThemeDecorator(Theme.LIGHT), FeatureFlagsDecorator({ isRedesignedApp: false })],
} as Meta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Light = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = { ...Template.args, label: 'Выберите значение:' };

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
