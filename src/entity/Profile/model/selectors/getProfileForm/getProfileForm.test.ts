import { StateSchema } from 'app/providers/StoreProvider';
import { ProfileErrors, ProfileSchema } from '../../types/profile';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm', () => {
    const data: DeepPartial<ProfileSchema> = {
        data: {
            username: 'user123',
        },
        readonly: true,
        error: ProfileErrors.SERVER_ERROR,
        form: {
            username: 'user321',
        },
    };

    test('should return profile form', () => {
        const state: DeepPartial<StateSchema> = {
            profile: data,
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data.form);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toBe(undefined);
    });
});
