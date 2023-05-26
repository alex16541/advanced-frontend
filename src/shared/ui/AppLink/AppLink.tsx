import { classNames } from 'shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import { FC } from 'react';
import cls from './AppLink.module.scss';

export enum AppLinkThemes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkThemes;
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        className, to, children, theme = AppLinkThemes.PRIMARY, ...otherProps
    } = props;

    return (
        <Link to={to} className={classNames(cls.AppLink, {}, [cls[theme], className])} {...otherProps}>
            {children}
        </Link>
    );
};
