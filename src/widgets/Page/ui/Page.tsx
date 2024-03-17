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
import { TestingProps } from '@/shared/types/testing';

import { selectScrollPositionByPath } from '../model/selectors/scrollSelectors';
import { ScrollActions } from '../model/slices/scrollSlice';

import cls from './Page.module.scss';

interface PageProps extends TestingProps {
    className?: string;
    children: ReactNode;
    onEndOfPage?: () => void;
}

export const Page = (props: PageProps) => {
    const {
        className, children, onEndOfPage, 'data-testid': dataTestId,
    } = props;
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
        <main
            className={classNames(cls.Page, {}, [className])}
            data-testid={dataTestId}
            ref={wrapperRef}
            onScroll={onScroll}
        >
            {children}
            <div className={cls.trigger} ref={triggerRef} />
        </main>
    );
};
