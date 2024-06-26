import { HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export const Card = (props: CardProps) => {
    const { className, children, ...otherProps } = props;

    return (
        <div className={classNames(cls.Card, {}, [className])} {...otherProps}>
            {children}
        </div>
    );
};
