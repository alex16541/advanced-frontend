import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { DescriptionTextEditor } from './DescriptionTextEditor';

export default {
    title: 'entity/TextEditor/DescriptionTextEditor',
    component: DescriptionTextEditor,
    args: {
        editable: true,
    },
} as Meta<typeof DescriptionTextEditor>;

type Story = StoryObj<typeof DescriptionTextEditor>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
