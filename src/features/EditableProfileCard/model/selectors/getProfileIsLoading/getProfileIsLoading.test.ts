import { StateSchema } from '@/app/providers/StoreProvider';

import { EditableProfileCardSchema } from '../../types/editableProfileCardSchema';

import { getProfileIsLoading } from './getProfileIsLoading';

describe('getProfileIsLoading', () => {
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

    test('should return profile isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            editableProfileCard: data,
        };
        expect(getProfileIsLoading(state as StateSchema)).toBe(data.isLoading);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileIsLoading(state as StateSchema)).toBe(false);
    });
});
