import { Meta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
    args: {
        codeText:
            "const source = Observable.create((observer) => {\n    let count = 0;\n    console.log('Observable created');\n\n    const timer = setInterval(() => {\n        observer.next(count);\n        count++;\n    }, 1000);\n\n    return () => {\n        console.log('Observable destroyed');\n        clearInterval(timer);\n    }\n});",
    },
} as Meta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
