import { addDecorator } from '@storybook/react';
// import { withThemes } from 'storybook-addon-themes';

import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator';
import { Theme } from '../../src/shared/consts/theme';

export const parameters = {
    actions: { argTypesRegex: '^on.*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    themes: {
        default: 'dark',
        list: [
            { name: 'light', class: ['root', Theme.LIGHT], color: '#fff' },
            { name: 'dark', class: ['root', Theme.DARK], color: '#000' },
            { name: 'green', class: ['root', Theme.GREEN], color: '#448267' },
        ],
    },
    layout: 'fullscreen',
};

addDecorator(StyleDecorator);
// addDecorator(withThemes);
addDecorator(ThemeDecorator(Theme.LIGHT, true));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
