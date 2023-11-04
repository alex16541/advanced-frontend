import { useMemo, useState, useCallback } from 'react';

export function useSet<T>(initialValue?: ReadonlyArray<T>) {
    const [updateTime, setUpdateTime] = useState(Date.now());
    const [set] = useState<Set<T>>(() => {
        if (initialValue) return new Set([...initialValue]);
        return new Set();
    });

    const update = useCallback(() => {
        // eslint-disable-next-line no-unused-expressions
        updateTime;
        setUpdateTime(Date.now());
    }, [updateTime]);

    const componentSet = useMemo(
        () => ({
            add(value: T) {
                const result = set.add(value);
                update();
                return result;
            },

            has(value: T) {
                return set.has(value);
            },

            delete(value: T) {
                const result = set.delete(value);
                update();
                return result;
            },

            clear() {
                set.clear();
                update();
            },

            map<R>(mapper: (value: T) => R) {
                const result: R[] = [];

                set.forEach((item) => {
                    result.push(mapper(item));
                });

                return result;
            },

            get size() {
                return set.size;
            },

            get entries() {
                return Array.from(set);
            },
        }),
        [set, update],
    );

    return componentSet;
}
