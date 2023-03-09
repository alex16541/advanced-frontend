import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword', () => {
    test('should return password', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: '123',
            },
        };
        expect(getLoginPassword(state as StateSchema)).toBe('123');
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { password: undefined },
        };
        expect(getLoginPassword(state as StateSchema)).toBe('');
    });
});
