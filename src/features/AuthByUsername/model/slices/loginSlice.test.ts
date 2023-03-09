import { DeepPartial } from '@reduxjs/toolkit';
import { loginReducer } from 'features/AuthByUsername/model/slices/loginSlice';
import { loginActions } from './loginSlice';
import { LoginSchema } from '../types/loginSchema';

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
