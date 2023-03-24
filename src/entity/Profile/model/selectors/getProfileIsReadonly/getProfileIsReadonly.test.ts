import { StateSchema } from 'app/providers/StoreProvider';
import { ProfileSchema } from 'entity/Profile';
import { ProfileErrors } from '../../types/profile';
import { getProfileIsReadonly } from './getProfileIsReadonly';

describe('getProfileIsReadonly', () => {
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

    test('should return profile readonly', () => {
        const state: DeepPartial<StateSchema> = {
            profile: data,
        };
        expect(getProfileIsReadonly(state as StateSchema)).toBe(data.readonly);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileIsReadonly(state as StateSchema)).toBe(true);
    });
});
