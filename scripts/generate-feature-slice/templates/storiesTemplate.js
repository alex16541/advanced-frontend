function storiesTemplate(featureName) {
    return `import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ${featureName} } from './${featureName}';

export default {
    title: 'folder/${featureName}',
    component: ${featureName},
} as Meta<typeof ${featureName}>;

type Story = StoryObj<typeof ${featureName}>

export const Light: Story = {};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.DARK)
    ]
}
`;
}

module.exports = storiesTemplate;
