import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkThemes } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { SidebarItemType } from '../../model/types/items';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    className?: string;
    item: SidebarItemType
    theme?: AppLinkThemes;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const {
        className,
        item,
        theme = AppLinkThemes.SECONDARY,
        collapsed,
    } = props;

    const { t } = useTranslation();

    return (
        <AppLink
            className={classNames(cls.SidebarItem, { [cls.collapsed]: collapsed }, [className])}
            to={item.path}
            theme={theme}
        >
            <item.Icon className={cls.icon} />
            <div className={cls.link}>{t(item.text)}</div>
        </AppLink>
    );
});
