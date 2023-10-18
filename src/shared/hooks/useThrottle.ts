import { useCallback, useRef } from 'react';

export const useThrottle = (callback: (...args: any[]) => void, dalay: number) => {
    const inProcess = useRef(false);
    return useCallback(
        (...args: any[]) => {
            if (!inProcess.current) {
                callback(...args);
                inProcess.current = true;

                setTimeout(() => {
                    inProcess.current = false;
                }, dalay);
            }
        },
        [callback, dalay],
    );
};
