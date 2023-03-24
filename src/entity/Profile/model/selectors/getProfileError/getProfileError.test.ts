import { StateSchema } from 'app/providers/StoreProvider';
import { ProfileSchema } from 'entity/Profile';
import { ProfileErrors } from '../../types/profile';
import { getProfileError } from './getProfileError';

describe('getProfileError', () => {
    const data: DeepPartial<ProfileSchema> = {
        data: {
            username: 'user123',
        },
        readonly: true,
        error: ProfileErrors.SERVER_ERROR,
    };

    test('should return profile error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: data,
        };
        expect(getProfileError(state as StateSchema)).toBe(data.error);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileError(state as StateSchema)).toBe(undefined);
    });
});
