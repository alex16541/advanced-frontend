import { renderWithProviders } from '@/shared/lib/tests/renderWithProviders/renderWithProviders';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
    test('To be in document', () => {
        const state: DeepPartial<StateSchema> = { counter: { value: 10 } };
        const renderRes = renderWithProviders(<Counter />, { initialState: state });
        const value = renderRes.getByTestId('value-title');
        expect(value).toHaveTextContent('10');
    });

    test('Increment', () => {
        const state: DeepPartial<StateSchema> = { counter: { value: 10 } };
        const renderRes = renderWithProviders(<Counter />, { initialState: state });
        const incBtn = renderRes.getByTestId('increment-btn');
        fireEvent.click(incBtn);

        const value = renderRes.getByTestId('value-title');
        expect(value).toHaveTextContent('11');
    });

    test('Decrement', () => {
        const state: DeepPartial<StateSchema> = { counter: { value: 10 } };
        const renderRes = renderWithProviders(<Counter />, { initialState: state });
        const decBtn = renderRes.getByTestId('decrement-btn');
        fireEvent.click(decBtn);

        const value = renderRes.getByTestId('value-title');
        expect(value).toHaveTextContent('9');
    });

    test('Should work with empty state', () => {
        const renderRes = renderWithProviders(<Counter />);
        const decBtn = renderRes.getByTestId('decrement-btn');
        fireEvent.click(decBtn);

        const value = renderRes.getByTestId('value-title');
        expect(value).toHaveTextContent('-1');
    });
});
