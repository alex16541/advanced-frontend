import { AnyAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios from 'axios';
import { Dispatch } from 'react';
import { userActions } from 'entity/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername, LoginErrors } from '../../services/loginByUsername/loginByUsername';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername', () => {
    test('login success', async () => {
        const returnValue = {
            id: '1',
            username: 'root',
            password: '123',
        };

        mockedAxios.post.mockResolvedValue({
            data: returnValue,
        });

        const thunk = new TestAsyncThunk(loginByUsername);
        const actionResult = await thunk.callThunk({ username: 'root', password: '123' });

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(returnValue));
        expect(actionResult.meta.requestStatus).toBe('fulfilled');
        expect(actionResult.payload).toEqual(returnValue);
    });

    test('login error', async () => {
        mockedAxios.post.mockResolvedValue({
            status: 403,
        });

        const thunk = new TestAsyncThunk(loginByUsername);
        const actionResult = await thunk.callThunk({ username: '123', password: '123' });

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual(LoginErrors.NOT_VALID_AUTH_DATA);
    });
});
