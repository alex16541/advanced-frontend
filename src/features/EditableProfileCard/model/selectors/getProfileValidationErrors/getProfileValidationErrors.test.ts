import { StateSchema } from 'app/providers/StoreProvider';
import { ProfileErrors } from 'entity/Profile';
import { getProfileValidationErrors } from './getProfileValidationErrors';
import { EditableProfileCardSchema, ProfileValidateErrors } from '../../types/editableProfileCardSchema';

describe('getProfileValidatationErrors', () => {
    const data: DeepPartial<EditableProfileCardSchema> = {
        data: {
            username: 'user123',
        },
        isLoading: true,
        readonly: true,
        error: ProfileErrors.SERVER_ERROR,
        form: {
            username: 'user321',
        },
        validateErrors: [
            ProfileValidateErrors.INCORRECT_EMAIL,
        ],
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
