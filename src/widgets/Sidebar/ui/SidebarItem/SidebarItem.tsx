import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkThemes } from 'shared/ui/AppLink/AppLink';
import cls from './SidebarItem.module.scss';

export interface SidebarItemType {
    Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    path: string;
    title: string;
}

interface SidebarItemProps extends SidebarItemType {
    className?: string;
    theme?: AppLinkThemes;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const {
        className,
        theme = AppLinkThemes.SECONDARY,
        Icon,
        collapsed,
        path,
        title,
    } = props;

    return (
        <AppLink
            className={classNames(cls.SidebarItem, { [cls.collapsed]: collapsed }, [className])}
            to={path}
            theme={theme}
        >
            <Icon className={cls.icon} />
            <div className={cls.link}>{title}</div>
        </AppLink>
    );
});
