import { ReactElement, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './StikyContentLayout.module.scss';

interface StikyContentLayoutProps {
    className?: string;
    left?: ReactElement;
    content: ReactElement;
    right?: ReactElement;
}

const StikyContentLayout = (props: StikyContentLayoutProps) => {
    const { className, content, left, right } = props;

    return (
        <div className={classNames(cls.StikyContentLayout, {}, [className])}>
            <div className={cls.left}>{left}</div>
            <div className={cls.content}>{content}</div>
            <div className={cls.right}>{right}</div>
        </div>
    );
};

const Memoized = memo(StikyContentLayout);

export { Memoized as StikyContentLayout };
