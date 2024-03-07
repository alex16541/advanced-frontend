function storiesTemplate(featureName) {
    return `import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { ${featureName} } from './${featureName}';

export default {
    title: 'folder/${featureName}',
    component: ${featureName},
    args: {

    },
} as ComponentMeta<typeof ${featureName}>;

const Template: ComponentStory<typeof ${featureName}> = (args) => <${featureName} {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
`;
}

module.exports = storiesTemplate;
