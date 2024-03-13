import { StateSchema } from '@/app/providers/StoreProvider';

import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername', () => {
    test('should return login state', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'root',
            },
        };
        expect(getLoginUsername(state as StateSchema)).toBe('root');
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { username: undefined },
        };
        expect(getLoginUsername(state as StateSchema)).toBe('');
    });
});
