import { StateSchema } from '@/app/providers/StoreProvider';

import { LoginSchema } from '../../types/loginSchema';

import { getLoginState } from './getLoginState';

describe('getLoginState', () => {
    test('should return login state', () => {
        const loginForm: LoginSchema = {
            username: 'root',
            password: '123',
            isLoading: true,
            error: undefined,
        };
        const state: DeepPartial<StateSchema> = {
            loginForm,
        };
        expect(getLoginState(state as StateSchema)).toBe(loginForm);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: undefined,
        };
        expect(getLoginState(state as StateSchema)).toBe(undefined);
    });
});
