import { ReactElement } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './StikyContentLayout.module.scss';

interface StikyContentLayoutProps {
    className?: string;
    left?: ReactElement;
    content: ReactElement;
    right?: ReactElement;
}

export const StikyContentLayout = (props: StikyContentLayoutProps) => {
    const { className, content, left, right } = props;

    return (
        <div className={classNames(cls.StikyContentLayout, {}, [className])}>
            {left && <div className={cls.left}>{left}</div>}
            <div className={cls.content}>{content}</div>
            {right && <div className={cls.right}>{right}</div>}
        </div>
    );
};
