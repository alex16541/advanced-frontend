import { Profile, ProfileSchema } from '../types/profile';
import { profileReducer, profileSlice, profileActions } from './profileSlice';

describe('profileSlice', () => {
    test('set readonly', () => {
        const state: DeepPartial<ProfileSchema> = {};
        const editedState = profileReducer(state as ProfileSchema, profileActions.setReadonly(true));

        expect(editedState).toEqual({ readonly: true });
    });

    test('cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = {
            data: {
                username: 'user123',
            },
            readonly: false,
        };
        const editedState = profileReducer(state as ProfileSchema, profileActions.cancelEdit());

        expect(editedState).toEqual({
            ...state,
            readonly: true,
            form: {
                ...state.data,
            },
        });
    });

    test('update profile', () => {
        const state: DeepPartial<ProfileSchema> = {
            form: {
                username: 'user123',
            },
            readonly: false,
        };

        const payload: Profile = {
            username: 'user',
        };

        const editedState = profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile(payload),
        );

        expect(editedState).toEqual({
            ...state,
            form: {
                username: 'user',
            },
        });
    });
});
