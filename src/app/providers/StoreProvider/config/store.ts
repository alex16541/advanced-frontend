import { configureStore } from '@reduxjs/toolkit';
import { couterReducer } from 'entities/Counter';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            counter: couterReducer,
        },
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
