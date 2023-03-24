import { StateSchema } from 'app/providers/StoreProvider';
import { ProfileSchema } from 'entity/Profile';
import { ProfileErrors } from '../../types/profile';
import { getProfileIsLoading } from './getProfileIsLoading';

describe('getProfileIsLoading', () => {
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
    };

    test('should return profile isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            profile: data,
        };
        expect(getProfileIsLoading(state as StateSchema)).toBe(data.isLoading);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileIsLoading(state as StateSchema)).toBe(false);
    });
});
