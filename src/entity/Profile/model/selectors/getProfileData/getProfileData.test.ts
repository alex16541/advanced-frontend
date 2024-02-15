import { StateSchema } from 'app/providers/StoreProvider';
import { ProfileSchema } from '../../../model/types/profile';
import { getProfileData } from './getProfileData';

describe('getProfileData', () => {
    const data: DeepPartial<ProfileSchema> = {
        data: {
            username: 'user123',
        },
        readonly: true,
    };

    test('should return profile data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: data,
        };
        expect(getProfileData(state as StateSchema)).toEqual(data.data);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toBe(undefined);
    });
});
