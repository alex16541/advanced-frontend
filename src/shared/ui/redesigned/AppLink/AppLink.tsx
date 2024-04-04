import { ReactNode, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { TestingProps } from '@/shared/types/testing';

import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'secondary';

export type AppLinkSize = 's' | 'm' | 'l' | 'xl';

interface AppLinkProps extends LinkProps, TestingProps {
    className?: string;
    theme?: AppLinkVariant;
    hover?: boolean;
    children?: ReactNode;
    size?: AppLinkSize;
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>((props, innerRef) => {
    const { className, to, children, theme = 'primary', size = 'm', hover = true, ...otherProps } = props;

    return (
        <Link
            className={classNames(cls.AppLink, { [cls.hover]: hover }, [cls[theme], cls[size], className])}
            ref={innerRef}
            to={to}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
