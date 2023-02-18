import {
    fireEvent, getByText, render, screen,
} from '@testing-library/react';
import {
    renderWithTranslation,
} from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from './Sidebar';

describe('Sidebar tests', () => {
    test('Exist in document', () => {
        renderWithTranslation(<Sidebar />);
        const sidebar = screen.getByTestId('sidebar');

        expect(sidebar).toBeInTheDocument();
    });

    test('test toggle', () => {
        renderWithTranslation(<Sidebar />);
        const toggle = screen.getByTestId('sidebar-toggle');
        fireEvent.click(toggle);
        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toBeInTheDocument();
        expect(sidebar).toHaveClass('collapsed');
        screen.debug();
    });
});
