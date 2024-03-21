import { Reducer } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { useStore, useDispatch } from 'react-redux';

import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';
import { useOnInit } from '@/shared/hooks/useOnInit';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

type ReducersListEntry = [name: StateSchemaKey, reducer: Reducer];

interface DynamicModuleLoaderProps {
    className?: string;
    removeAfterUnmout?: boolean;
    reducers: ReducersList;
    dataTestId?: string;
    children: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const { className, reducers, children, removeAfterUnmout = true, dataTestId } = props;
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

    return (
        <div className={className} data-testid={dataTestId}>
            {children}
        </div>
    );
};
