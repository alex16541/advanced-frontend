import { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;
    const [collapsed, setCollapsed] = useState(false);

    function onToggle() {
        setCollapsed(value => !value);
    }

    return (
        <div className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <Button
                theme={ButtonThemes.SECONDARY}
                onClick={onToggle}
            >
                toggle
            </Button>
            <div className={cls.actions}>
                <ThemeSwitcher />
            </div>
        </div>
    );
}