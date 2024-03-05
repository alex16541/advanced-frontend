import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ProfileErrors } from '@/entity/Profile';
import { featchProfileData } from './featchProfileData';

describe('featchProfileData', () => {
    const returnValue = {
        username: 'user123',
        lastname: 'userLastname',
        age: 32,
        city: 'City123',
    };
    test('fetch success', async () => {
        const thunk = new TestAsyncThunk(featchProfileData);
        thunk.api.get.mockResolvedValue({
            data: returnValue,
        });
        const actionResult = await thunk.callThunk('1');

        expect(actionResult.meta.requestStatus).toBe('fulfilled');
        expect(actionResult.payload).toEqual(returnValue);
    });

    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(featchProfileData);
        thunk.api.get.mockResolvedValue({
            status: 403,
        });

        const actionResult = await thunk.callThunk('1');

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual(ProfileErrors.UNKNOWN_ERROR);
    });
});
