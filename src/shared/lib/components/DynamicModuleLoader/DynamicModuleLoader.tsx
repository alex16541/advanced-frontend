import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUsername/model/slices/loginSlice';
import { FC, useEffect } from 'react';
import { useStore, useDispatch } from 'react-redux';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer
}

type ReducersListEntry = [name: StateSchemaKey, reducer: Reducer]

interface DynamicModuleLoaderProps {
    reducers: ReducersList,
    removeAfterUnmout?: boolean,
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        reducers,
        children,
        removeAfterUnmout = true,
    } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([reducerKey, reducer]: ReducersListEntry) => {
            store.reducerManager.add(reducerKey, reducer);
            dispatch({ type: `@INIT ${reducerKey} reducer` });
        });

        return () => {
            if (removeAfterUnmout) {
                Object.entries(reducers).forEach(([reducerKey, reducer]: ReducersListEntry) => {
                    store.reducerManager.remove(reducerKey);
                    dispatch({ type: `@DESTROY ${reducerKey} reducer` });
                });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {children}
        </div>
    );
};
