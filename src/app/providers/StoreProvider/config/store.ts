import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { couterReducer } from 'entity/Counter';
import { userReducer } from 'entity/User';
import { loginReducer } from 'features/AuthByUsername';
import { StateSchema } from './StateSchema';

const rootReducers: ReducersMapObject<StateSchema> = {
    counter: couterReducer,
    user: userReducer,
    loginForm: loginReducer,
};

export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
