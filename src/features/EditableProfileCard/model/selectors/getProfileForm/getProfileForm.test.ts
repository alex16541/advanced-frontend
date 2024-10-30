import { StateSchema } from '@/app/providers/StoreProvider';

import { EditableProfileCardSchema } from '../../types/editableProfileCardSchema';

import { getProfileForm } from './getProfileForm';

describe('getProfileForm', () => {
    const data: DeepPartial<EditableProfileCardSchema> = {
        data: {
            username: 'user123',
        },
        readonly: true,
        error: 'SERVER_ERROR',
        form: {
            username: 'user321',
        },
    };

    test('should return profile form', () => {
        const state: DeepPartial<StateSchema> = {
            editableProfileCard: data,
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data.form);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toBe(undefined);
    });
});
