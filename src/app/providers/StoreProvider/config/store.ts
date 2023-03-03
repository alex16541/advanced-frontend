import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { couterReducer } from 'entity/Counter';
import { userReducer } from 'entity/User';
import { StateSchema } from './StateSchema';

const rootReducers: ReducersMapObject = {
    counter: couterReducer,
    user: userReducer,
};

export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
