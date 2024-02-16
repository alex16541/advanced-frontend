import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { TranslateSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { VStack } from 'shared/ui/Stack';
import { selectSidebarItems } from '../../model/selectors/selectSidebarItems/selectSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItems = useSelector(selectSidebarItems);

    const itemList = useMemo(
        () => sidebarItems.map((item) => <SidebarItem key={item.path} item={item} collapsed={collapsed} />),
        [collapsed, sidebarItems],
    );

    function onToggle() {
        setCollapsed((value) => !value);
    }

    return (
        <aside data-testid="sidebar" className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <VStack gap="16" justify="Start">{itemList}</VStack>
            <Button data-testid="sidebar-toggle" theme={ButtonThemes.PRIMARY} onClick={onToggle} className={cls.toggle}>
                {collapsed ? '>' : '<'}
            </Button>
            <VStack gap="10" max role="navigation" className={cls.actions}>
                <ThemeSwitcher data-testid="theme-switcher" />
                <TranslateSwitcher />
            </VStack>
        </aside>
    );
});
