import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { render } from '@testing-library/react';
import i18n from 'shared/config/i18n/i18nForTests';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { MemoryRouter } from 'react-router-dom';

export function renderWithProviders(component: ReactNode, initioalEntrie: string = '/') {
    return render(
        <MemoryRouter initialEntries={[initioalEntrie]}>
            <ThemeProvider>
                <I18nextProvider i18n={i18n}>
                    {component}
                </I18nextProvider>
            </ThemeProvider>
        </MemoryRouter>,
    );
}
