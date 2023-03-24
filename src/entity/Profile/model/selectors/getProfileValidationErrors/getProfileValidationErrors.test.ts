import { StateSchema } from 'app/providers/StoreProvider';
import { ProfileSchema } from 'entity/Profile';
import { ProfileErrors, ProfileValidateErrors } from '../../types/profile';
import { getProfileValidationErrors } from './getProfileValidationErrors';

describe('getProfileValidatationErrors', () => {
    const data: DeepPartial<ProfileSchema> = {
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
            profile: data,
        };
        expect(getProfileValidationErrors(state as StateSchema)).toEqual(data.validateErrors);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidationErrors(state as StateSchema)).toEqual([]);
    });
});
