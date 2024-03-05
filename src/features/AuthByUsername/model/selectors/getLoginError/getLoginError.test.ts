import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';
import { LoginErrors } from '../../services/loginByUsername/loginByUsername';
import { getLoginError } from './getLoginError';

describe('getLoginError', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: LoginErrors.NOT_VALID_AUTH_DATA,
            },
        };
        expect(getLoginError(state as StateSchema)).toBe(LoginErrors.NOT_VALID_AUTH_DATA);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { error: undefined },
        };
        expect(getLoginError(state as StateSchema)).toBe(undefined);
    });
});
