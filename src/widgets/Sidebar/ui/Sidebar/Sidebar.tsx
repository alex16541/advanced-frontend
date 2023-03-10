import { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { TranslateSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { sidebarItems } from 'shared/config/routeConfig/routeConfig';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();

    function onToggle() {
        setCollapsed((value) => !value);
    }

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className,
            ])}
        >
            <div className={cls.content}>
                {sidebarItems.map((item) => (
                    <SidebarItem
                        path={item.path}
                        title={t(item.title)}
                        Icon={item.Icon}
                        collapsed={collapsed}
                    />
                ))}
            </div>
            <Button
                data-testid="sidebar-toggle"
                theme={ButtonThemes.PRIMARY}
                onClick={onToggle}
                className={cls.toggle}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={cls.actions}>
                <ThemeSwitcher data-testid="theme-switcher" />
                <TranslateSwitcher />
            </div>
        </div>
    );
};
