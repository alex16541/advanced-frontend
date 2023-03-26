import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ProfileErrors, ProfileValidateErrors } from '../../types/profile';
import { updateProfileData } from './updateProfileData';

describe('updateProfileData', () => {
    const data = {
        username: 'user123',
        firstname: 'firstname',
        lastname: 'userLastname',
        age: 32,
        city: 'City123',
        email: 'user@mail.com',
    };
    test('update success', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData,
            {
                profile: {
                    form: data,
                },
            },
        );

        thunk.api.put.mockResolvedValue({
            data,
        });
        const actionResult = await thunk.callThunk();

        expect(actionResult.meta.requestStatus).toBe('fulfilled');
        expect(actionResult.payload).toEqual(data);
    });

    test('update error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData);
        thunk.api.put.mockResolvedValue({
            status: 403,
        });

        const actionResult = await thunk.callThunk();

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual([ProfileErrors.SERVER_ERROR]);
    });

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData,
            {
                profile: {
                    form: { ...data, email: 'email' },
                },
            },
        );

        const actionResult = await thunk.callThunk();

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual([ProfileValidateErrors.INCORRECT_EMAIL]);
    });
});
