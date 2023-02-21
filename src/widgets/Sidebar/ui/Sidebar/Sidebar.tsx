import { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { TranslateSwitcher } from 'widgets/LangSwitcher';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;
    const [collapsed, setCollapsed] = useState(false);

    function onToggle() {
        setCollapsed((value) => !value);
    }

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <Button
                data-testid="sidebar-toggle"
                theme={ButtonThemes.PRIMARY}
                onClick={onToggle}
            >
                {collapsed ? '+' : 'test toggle sidebar btn'}
            </Button>
            <div className={cls.actions}>
                <ThemeSwitcher data-testid="theme-switcher" />
                <TranslateSwitcher />
            </div>
        </div>
    );
};
