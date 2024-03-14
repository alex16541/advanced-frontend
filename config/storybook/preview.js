import { addDecorator } from '@storybook/react';

import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator';
import { Theme } from '../../src/shared/const/theme';

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
    layout: 'fullscreen',
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT, true));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
