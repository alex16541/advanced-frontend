import { ReactNode, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { TestingProps } from '@/shared/types/testing';

import cls from './AppLink.module.scss';

export enum AppLinkThemes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps, TestingProps{
    className?: string;
    theme?: AppLinkThemes;
    hover?: boolean;
    children?: ReactNode;
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>((props, innerRef) => {
    const {
        className, to, children, theme = AppLinkThemes.PRIMARY, hover = true, ...otherProps
    } = props;

    return (
        <Link
            className={classNames(cls.AppLink, { [cls.hover]: hover }, [cls[theme], className])}
            ref={innerRef}
            to={to}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
