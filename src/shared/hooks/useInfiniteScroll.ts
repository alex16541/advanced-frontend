import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef?: MutableRefObject<HTMLElement> | null;
}

export function useInfiniteScroll(options: UseInfiniteScrollOptions) {
    const { callback, triggerRef, wrapperRef } = options;

    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        const target = triggerRef.current;

        if (callback) {
            const options: IntersectionObserverInit = {
                root: wrapperRef?.current ?? null,
                rootMargin: '1px',
                threshold: 1.0,
            };

            observer = new IntersectionObserver(([entry], observer) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.observe(target);
        }

        return () => {
            observer?.unobserve(target);
        };
    }, [callback, triggerRef, wrapperRef]);
}
