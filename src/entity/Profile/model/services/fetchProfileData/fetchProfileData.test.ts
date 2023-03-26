import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ProfileErrors } from '../../types/profile';
import { fetchProfileData } from './fetchProfileData';

describe('fetchProfileData', () => {
    const returnValue = {
        username: 'user123',
        lastname: 'userLastname',
        age: 32,
        city: 'City123',
    };
    test('fetch success', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockResolvedValue({
            data: returnValue,
        });
        const actionResult = await thunk.callThunk();

        expect(actionResult.meta.requestStatus).toBe('fulfilled');
        expect(actionResult.payload).toEqual(returnValue);
    });

    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockResolvedValue({
            status: 403,
        });

        const actionResult = await thunk.callThunk();

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual(ProfileErrors.UNKNOWN_ERROR);
    });
});
