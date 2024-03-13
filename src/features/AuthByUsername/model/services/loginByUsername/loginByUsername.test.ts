import { userActions } from '@/entity/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import {
    loginByUsername,
    LoginErrors,
} from '../../services/loginByUsername/loginByUsername';

describe('loginByUsername', () => {
    test('login success', async () => {
        const returnValue = {
            id: '1',
            username: 'root',
            profileId: '1',
            password: '123',
        };

        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockResolvedValue({
            data: returnValue,
        });
        const actionResult = await thunk.callThunk({
            username: 'root',
            password: '123',
        });

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(returnValue),
        );
        expect(actionResult.meta.requestStatus).toBe('fulfilled');
        expect(actionResult.payload).toEqual(returnValue);
    });

    test('login error', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockResolvedValue({
            status: 403,
        });

        const actionResult = await thunk.callThunk({
            username: '123',
            password: '123',
        });

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual(LoginErrors.NOT_VALID_AUTH_DATA);
    });
});
