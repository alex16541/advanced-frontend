import { StateSchema } from '@/app/providers/StoreProvider';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

type Selector<T> = (store:StateSchema) => T;
type Result<T> = [() => T, Selector<T>];

export function buildSelector<T>(selector: Selector<T>): Result<T> {
    const useSelectorHook = () => useAppSelector(selector);

    return [useSelectorHook, selector];
}
