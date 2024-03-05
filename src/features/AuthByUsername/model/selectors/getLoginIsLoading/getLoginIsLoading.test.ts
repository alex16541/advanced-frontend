import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading', () => {
    test('should return loading status', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: true,
            },
        };
        expect(getLoginIsLoading(state as StateSchema)).toBe(true);
    });

    test('should work with undefined', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { isLoading: undefined },
        };
        expect(getLoginIsLoading(state as StateSchema)).toBe(false);
    });
});
