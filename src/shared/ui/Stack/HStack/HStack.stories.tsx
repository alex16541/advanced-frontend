import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { HStack } from './HStack';

export default {
    title: 'shared/HStack',
    component: HStack,
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
} as ComponentMeta<typeof HStack>;

const Template: ComponentStory<typeof HStack> = (args) => <HStack {...args} />;

export const Light = Template.bind({});

export const JustifyStart = Template.bind({});
JustifyStart.args = { ...Template.args, justify: 'Start' };

export const JustifyEnd = Template.bind({});
JustifyEnd.args = { ...Template.args, justify: 'End' };

export const JustifySpaceBetween = Template.bind({});
JustifySpaceBetween.args = { ...Template.args, justify: 'SpaceBetween' };

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
