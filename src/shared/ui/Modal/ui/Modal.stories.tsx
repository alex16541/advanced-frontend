import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Modal } from './Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
};

const Template: typeof Modal = (args) => <Modal {...args} />;

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
