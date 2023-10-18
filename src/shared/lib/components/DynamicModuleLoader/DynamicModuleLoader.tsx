import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider';
import { FC } from 'react';
import { useStore, useDispatch } from 'react-redux';
import { useOnInit } from 'shared/hooks/useOnInit';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [name: StateSchemaKey, reducer: Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmout?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { reducers, children, removeAfterUnmout = true } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useOnInit(() => {
        const mountedReducers = store.reducerManager.getReducerMap();

        Object.entries(reducers).forEach(([reducerKey, reducer]) => {
            const mounted = !!mountedReducers[reducerKey as StateSchemaKey];

            if (!mounted) {
                store.reducerManager.add(reducerKey as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${reducerKey} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmout) {
                Object.entries(reducers).forEach(([reducerKey, reducer]) => {
                    store.reducerManager.remove(reducerKey as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${reducerKey} reducer` });
                });
            }
        };
    });

    return <div>{children}</div>;
};
