import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,
    args: {
        children: (
            <>
                <div>Block 1</div>
                <div>Block 2</div>
                <div>Block 3</div>
                <div>Block 4</div>
                <div>Block 5</div>
                <div>Block 6</div>
                <div>Block 7</div>
            </>
        ),
    },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});

export const Column = Template.bind({});
Column.args = { ...Template.args, direction: 'Column' };

export const Gap = Template.bind({});
Gap.args = { ...Template.args, direction: 'Column', gap: '32' };

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
