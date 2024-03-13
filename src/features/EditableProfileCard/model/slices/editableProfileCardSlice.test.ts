import { Profile } from '@/entity/Profile';

import { EditableProfileCardSchema } from '../types/editableProfileCardSchema';

import { editableProfileCardReducer, editableProfileCardActions } from './editableProfileCardSlice';

describe('profileSlice', () => {
    test('set readonly', () => {
        const state: DeepPartial<EditableProfileCardSchema> = {};
        const editedState = editableProfileCardReducer(state as EditableProfileCardSchema, editableProfileCardActions.setReadonly(true));

        expect(editedState).toEqual({ readonly: true });
    });

    test('cancel edit', () => {
        const state: DeepPartial<EditableProfileCardSchema> = {
            data: {
                username: 'user123',
            },
            readonly: false,
        };
        const editedState = editableProfileCardReducer(state as EditableProfileCardSchema, editableProfileCardActions.cancelEdit());

        expect(editedState).toEqual({
            ...state,
            readonly: true,
            form: {
                ...state.data,
            },
        });
    });

    test('update profile', () => {
        const state: DeepPartial<EditableProfileCardSchema> = {
            form: {
                username: 'user123',
            },
            readonly: false,
        };

        const payload: Profile = {
            username: 'user',
        };

        const editedState = editableProfileCardReducer(
            state as EditableProfileCardSchema,
            editableProfileCardActions.updateProfile(payload),
        );

        expect(editedState).toEqual({
            ...state,
            form: {
                username: 'user',
            },
        });
    });
});
