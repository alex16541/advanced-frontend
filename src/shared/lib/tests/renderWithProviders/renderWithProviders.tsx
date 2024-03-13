import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import i18n from '@/shared/config/i18n/i18nForTests';

export interface renderWithProvidersOptions {
    initialEntrie?: string,
    initialState?: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
}

export function renderWithProviders(
    component: ReactNode,
    options: renderWithProvidersOptions = {},
) {
    const {
        initialEntrie = '/',
        initialState,
        asyncReducers,
        ...otherOptions
    } = options;

    return render(
        <MemoryRouter initialEntries={[initialEntrie]}>
            <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
                </ThemeProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
}
