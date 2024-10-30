import { StateSchema } from '@/app/providers/StoreProvider';

import { EditableProfileCardSchema } from '../../types/editableProfileCardSchema';

import { getProfileValidationErrors } from './getProfileValidationErrors';

describe('getProfileValidatationErrors', () => {
    const data: DeepPartial<EditableProfileCardSchema> = {
        data: {
            username: 'user123',
        },
        isLoading: true,
        readonly: true,
        error: 'SERVER_ERROR',
        form: {
            username: 'user321',
        },
        validateErrors: ['INCORRECT_EMAIL'],
    };

    test('should return profile validation errors', () => {
        const state: DeepPartial<StateSchema> = {
            editableProfileCard: data,
        };
        expect(getProfileValidationErrors(state as StateSchema)).toEqual(data.validateErrors);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidationErrors(state as StateSchema)).toEqual([]);
    });
});
