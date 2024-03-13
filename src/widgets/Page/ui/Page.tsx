import {
    MutableRefObject, ReactNode, useRef, UIEvent,
} from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useOnInit } from '@/shared/hooks/useOnInit';
import { useThrottle } from '@/shared/hooks/useThrottle';
import { classNames } from '@/shared/lib/classNames/classNames';

import { selectScrollPositionByPath } from '../model/selectors/scrollSelectors';
import { ScrollActions } from '../model/slices/scrollSlice';

import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onEndOfPage?: () => void;
}

export const Page = (props: PageProps) => {
    const { className, children, onEndOfPage } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useAppSelector((store) => selectScrollPositionByPath(store, pathname));

    const onScroll = useThrottle((e: UIEvent<HTMLElement>) => {
        dispatch(ScrollActions.setScrollPosition({ path: pathname, position: e.currentTarget.scrollTop }));
    }, 200);

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onEndOfPage,
    });

    useOnInit(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    return (
        <main ref={wrapperRef} className={classNames(cls.Page, {}, [className])} onScroll={onScroll}>
            {children}
            <div ref={triggerRef} className={cls.trigger} />
        </main>
    );
};
