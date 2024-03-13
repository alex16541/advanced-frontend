import { ReactNode, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

export enum AppLinkThemes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
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
            ref={innerRef}
            to={to}
            className={classNames(cls.AppLink, { [cls.hover]: hover }, [cls[theme], className])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
