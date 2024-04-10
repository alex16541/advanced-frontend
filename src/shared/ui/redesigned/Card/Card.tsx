import { HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    maxWidth?: boolean;
}

export const Card = (props: CardProps) => {
    const { className, children, maxWidth, ...otherProps } = props;

    return (
        <div className={classNames(cls.Card, { [cls.maxWidth]: maxWidth }, [className])} {...otherProps}>
            {children}
        </div>
    );
};
