import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAuthData } from '@/entity/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';

import { SidebarItemType } from '../../model/types/sidebarItem';

import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    className?: string;
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { className, item, collapsed } = props;

    const { t } = useTranslation();
    const isAuth = useSelector(getAuthData);

    if (item.authOnly && !isAuth) return null;

    return (
        <NavLink
            to={item.path}
            className={({ isActive }) =>
                classNames(cls.SidebarItem, { [cls.collapsed]: collapsed, [cls.active]: isActive }, [
                    className,
                ])
            }
        >
            <Icon className={cls.icon} Svg={item.Icon} />
            <div className={cls.link}>{t(item.text)}</div>
        </NavLink>
    );
});
