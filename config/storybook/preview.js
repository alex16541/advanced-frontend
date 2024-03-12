import { addDecorator } from '@storybook/react';
import { Theme } from '../../src/shared/const/theme';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    parameters: {
        actions: { argTypesRegex: '^on.*' },
    },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT, true));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
