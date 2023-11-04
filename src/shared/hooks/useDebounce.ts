import { useCallback, useRef } from 'react';

export const useDebounce = (callback: (...args: any[]) => void, dalay: number) => {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }

            timer.current = setTimeout(() => {
                callback(...args);
            }, dalay);
        },
        [callback, dalay],
    );
};
