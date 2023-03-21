import {
    FC, memo, useMemo, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { TranslateSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { sidebarItems } from '../../model/types/items';

interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = memo((props: SidebarProps) => {
    const { className } = props;
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();

    function onToggle() {
        setCollapsed((value) => !value);
    }

    const itemList = useMemo(() => sidebarItems.map((item) => (
        <SidebarItem
            key={item.path}
            item={item}
            collapsed={collapsed}
        />
    )), [collapsed]);

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className,
            ])}
        >
            <div className={cls.content}>
                {itemList}
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
});
