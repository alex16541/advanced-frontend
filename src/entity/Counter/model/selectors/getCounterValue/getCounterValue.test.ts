import { StateSchema } from '@/app/providers/StoreProvider';

import { getCounterValue } from './getCounterValue';

describe('getCounterValue', () => {
    test('should return couter value', () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        expect(getCounterValue(state as StateSchema)).toEqual(state.counter?.value || 0);
    });
});
