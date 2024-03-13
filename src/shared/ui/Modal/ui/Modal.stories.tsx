import { Story } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Modal } from './Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
};

const Template: Story = (args) => (
    <Modal
        {...args}
    >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum, quis
    </Modal>
);

export const Light = Template.bind({});
Light.args = {
    // eslint-disable-next-line i18next/no-literal-string
    children:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum, quis',
    isOpen: true,
};
export const Dark = Template.bind({});
Dark.args = {
    ...Light.args,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
