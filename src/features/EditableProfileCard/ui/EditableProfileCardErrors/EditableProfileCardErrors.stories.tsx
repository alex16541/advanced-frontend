import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { EditableProfileCardErrors } from './EditableProfileCardErrors';

export default {
    title: 'folder/EditableProfileCardErrors',
    component: EditableProfileCardErrors,
    args: {

    },
} as ComponentMeta<typeof EditableProfileCardErrors>;

const Template: ComponentStory<typeof EditableProfileCardErrors> = (args) => <EditableProfileCardErrors {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
