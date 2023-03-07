import {
    AnyAction, CombinedState, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { CounterSchema } from 'entity/Counter';
import { UserSchema } from 'entity/User';
import { LoginSchema } from 'features/AuthByUsername/model/types/loginSchema';

export interface StateSchema {
    counter: CounterSchema,
    user: UserSchema,

    // Async
    loginForm?: LoginSchema,
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, actions: AnyAction) => CombinedState<StateSchema>,
    add: (key: StateSchemaKey, reducer: Reducer) => void,
    remove: (key: StateSchemaKey) => void,
}

export interface ReduxStoreWithManager extends ToolkitStore<StateSchema> {
    reducerManager: ReducerManager;
}
