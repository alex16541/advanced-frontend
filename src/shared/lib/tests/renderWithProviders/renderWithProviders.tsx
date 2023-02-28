import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { render } from '@testing-library/react';
import i18n from 'shared/config/i18n/i18nForTests';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';

export interface renderWithProvidersOptions {
    initialEntrie?: string,
    initialState?: DeepPartial<StateSchema>,
}

export function renderWithProviders(
    component: ReactNode,
    options: renderWithProvidersOptions = {},
) {
    const {
        initialEntrie = '/',
        initialState,
        ...otherOptions
    } = options;

    return render(
        <StoreProvider initialState={initialState}>
            <MemoryRouter initialEntries={[initialEntrie]}>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
                </ThemeProvider>
            </MemoryRouter>
        </StoreProvider>
        ,
    );
}
