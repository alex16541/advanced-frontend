import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import i18n from '@/shared/config/i18n/i18nForTests';
import { Theme } from '@/shared/consts/theme';
// eslint-disable-next-line alex16541-fsd-imports-path-checker/layers-imports
import '@/app/styles/index.scss';

interface componentRenderOptions {
    initialEntrie?: string,
    initialState?: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
}

interface TestProviderOptions {
    children: ReactNode,
    options?: componentRenderOptions;
}

export function TestProvider(props: TestProviderOptions) {
    const {
        children,
        options = {},
        ...otherOptions
    } = props;

    const {
        initialEntrie = '/',
        initialState,
        asyncReducers,
    } = options;

    return (
        <MemoryRouter initialEntries={[initialEntrie]}>
            <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
                <ThemeProvider initialTheme={Theme.DARK}>
                    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
                </ThemeProvider>
            </StoreProvider>
        </MemoryRouter>
    );
}

export function renderWithProviders(component: ReactNode, options?: componentRenderOptions) {
    return render(<TestProvider options={options}>{component}</TestProvider>);
}
