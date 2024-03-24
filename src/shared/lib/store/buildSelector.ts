import { StateSchema } from '@/app/providers/StoreProvider';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

type Selector<T, Args extends any[]> = (store: StateSchema, ...args: Args) => T;
type Hook<T, Args extends any[]> = (...args: Args) => T;
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];

export function buildSelector<T, Args extends any[]>(selector: Selector<T, Args>): Result<T, Args> {
    const useSelectorHook = (...args: Args) =>
        useAppSelector((state: StateSchema) => selector(state, ...args));

    return [useSelectorHook, selector];
}
