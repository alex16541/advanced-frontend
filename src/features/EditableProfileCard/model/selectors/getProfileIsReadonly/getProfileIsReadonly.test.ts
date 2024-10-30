import { StateSchema } from '@/app/providers/StoreProvider';

import { EditableProfileCardSchema } from '../../types/editableProfileCardSchema';

import { getProfileIsReadonly } from './getProfileIsReadonly';

describe('getProfileIsReadonly', () => {
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
    };

    test('should return profile readonly', () => {
        const state: DeepPartial<StateSchema> = {
            editableProfileCard: data,
        };
        expect(getProfileIsReadonly(state as StateSchema)).toBe(data.readonly);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileIsReadonly(state as StateSchema)).toBe(true);
    });
});
