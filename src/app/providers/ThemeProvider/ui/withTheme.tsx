import React from 'react';

import { useJsonSettings } from '@/entity/User';

import ThemeProvider from './ThemeProvider';

export const withTheme = (Component: React.ComponentType) => () => {
    const { theme } = useJsonSettings();
    return (
        <ThemeProvider initialTheme={theme}>
            <Component />
        </ThemeProvider>
    );
};
