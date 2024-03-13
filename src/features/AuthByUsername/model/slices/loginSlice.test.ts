import { loginReducer } from '../../model/slices/loginSlice';
import { LoginSchema } from '../types/loginSchema';

import { loginActions } from './loginSlice';

describe('loginSlice', () => {
    test('set username', () => {
        const state: DeepPartial<LoginSchema> = {};
        const editedState = loginReducer(state as LoginSchema, loginActions.setUsername('user'));

        expect(editedState).toEqual({ username: 'user' });
    });

    test('set password', () => {
        const state: DeepPartial<LoginSchema> = {};
        const editedState = loginReducer(state as LoginSchema, loginActions.setPassword('123'));

        expect(editedState).toEqual({ password: '123' });
    });
});
