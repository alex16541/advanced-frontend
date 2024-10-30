import { StateSchema } from '@/app/providers/StoreProvider';

import { EditableProfileCardSchema } from '../../types/editableProfileCardSchema';

import { getProfileError } from './getProfileError';

describe('getProfileError', () => {
    const data: DeepPartial<EditableProfileCardSchema> = {
        data: {
            username: 'user123',
        },
        readonly: true,
        error: 'SERVER_ERROR',
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
