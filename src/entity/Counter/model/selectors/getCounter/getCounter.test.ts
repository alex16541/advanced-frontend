import { StateSchema } from 'app/providers/StoreProvider';
import { getCounter } from './getCounter';

describe('getCouter', () => {
    test('should return counter', () => {
        const state: DeepPartial<StateSchema> = {
            counter: {
                value: 9,
            },
        };
        expect(getCounter(state as StateSchema)).toEqual(state.counter);
    });
});
