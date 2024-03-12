import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { VStack } from './VStack';

export default {
    title: 'shared/VStack',
    component: VStack,
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
} as ComponentMeta<typeof VStack>;

const Template: ComponentStory<typeof VStack> = (args) => <VStack {...args} />;

export const Light = Template.bind({});

export const AlignStart = Template.bind({});
AlignStart.args = { ...Template.args, align: 'Start' };

export const AlignEnd = Template.bind({});
AlignEnd.args = { ...Template.args, align: 'End' };

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
