import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { updateProfileData } from './updateProfileData';

describe('updateProfileData', () => {
    const data = {
        id: '1',
        username: 'user123',
        firstname: 'firstname',
        lastname: 'userLastname',
        age: 32,
        city: 'City123',
        email: 'user@mail.com',
    };

    test('update success', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            editableProfileCard: {
                form: data,
            },
            user: {
                authData: {
                    id: '1',
                },
            },
        });

        thunk.api.put.mockResolvedValue({
            data,
            status: 200,
        });

        thunk.api.patch.mockResolvedValue({
            data,
            status: 200,
        });

        const actionResult = await thunk.callThunk();

        expect(actionResult.meta.requestStatus).toBe('fulfilled');
        expect(actionResult.payload).toEqual(data);
    });

    test('with status code error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            editableProfileCard: {
                form: data,
            },
            user: {
                authData: {
                    id: '1',
                },
            },
        });

        thunk.api.put.mockResolvedValue({
            status: 403,
        });

        thunk.api.patch.mockResolvedValue({
            data,
            status: 403,
        });

        const actionResult = await thunk.callThunk();

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual('FORBIDDEN');
    });

    test('with any error ', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            editableProfileCard: {
                form: data,
            },
            user: {
                authData: {
                    id: '1',
                },
            },
        });

        thunk.api.put.mockResolvedValue({
            status: 666,
        });

        thunk.api.patch.mockResolvedValue({
            data,
            status: 666,
        });

        const actionResult = await thunk.callThunk();

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual('UNKNOWN_ERROR');
    });

    test('no profile data error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            user: {
                authData: {
                    id: '1',
                },
            },
        });

        const actionResult = await thunk.callThunk();

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual(['NO_DATA']);
    });

    test('no auth data error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            user: {},
            editableProfileCard: {
                form: data,
            },
        });

        const actionResult = await thunk.callThunk();

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual(['NO_DATA']);
    });

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            editableProfileCard: {
                form: { ...data, email: 'email' },
            },
            user: {
                authData: {
                    id: '1',
                },
            },
        });

        const actionResult = await thunk.callThunk();

        expect(actionResult.meta.requestStatus).toBe('rejected');
        expect(actionResult.payload).toEqual(['INCORRECT_EMAIL']);
    });
});
