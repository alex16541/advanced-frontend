import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from 'shared/lib/tests/renderWithProviders/renderWithProviders';
import { Sidebar } from './Sidebar';

describe('Sidebar tests', () => {
    test('Exist in document', () => {
        renderWithProviders(<Sidebar />);
        const sidebar = screen.getByTestId('sidebar');

        expect(sidebar).toBeInTheDocument();
    });

    test('Toggle sidebar', () => {
        renderWithProviders(<Sidebar />);
        const toggle = screen.getByTestId('sidebar-toggle');
        fireEvent.click(toggle);
        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toBeInTheDocument();
        expect(sidebar).toHaveClass('collapsed');
    });

    test('Change theme', () => {
        renderWithProviders(<Sidebar />);
        const themeSwitcher = screen.getByTestId('theme-switcher');
        fireEvent.click(themeSwitcher);
        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toBeInTheDocument();
    });
});
