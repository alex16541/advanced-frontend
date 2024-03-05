import { StateSchema } from '@/app/providers/StoreProvider';
import { ProfileErrors } from '@/entity/Profile';
import { getProfileError } from './getProfileError';
import { EditableProfileCardSchema } from '../../types/editableProfileCardSchema';

describe('getProfileError', () => {
    const data: DeepPartial<EditableProfileCardSchema> = {
        data: {
            username: 'user123',
        },
        readonly: true,
        error: ProfileErrors.SERVER_ERROR,
    };

    test('should return profile error', () => {
        const state: DeepPartial<StateSchema> = {
            editableProfileCard: data,
        };
        expect(getProfileError(state as StateSchema)).toBe(data.error);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileError(state as StateSchema)).toBe(undefined);
    });
});
