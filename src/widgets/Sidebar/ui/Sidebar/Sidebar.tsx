import { memo, useMemo, useState } from 'react';
import { BrowserView } from 'react-device-detect';
import { useSelector } from 'react-redux';

import { TranslateSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/FeatureToggle/FeatureToggle';
import { AppLogo } from '@/shared/ui/deprecated/AppLogo';
import { Button, ButtonThemes } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/deprecated/Stack';

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
        () => sidebarItems.map((item) => <SidebarItem collapsed={collapsed} item={item} key={item.path} />),
        [collapsed, sidebarItems],
    );

    function onToggle() {
        setCollapsed((value) => !value);
    }

    return (
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <BrowserView>
                    <aside
                        className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
                        data-testid="sidebar"
                    >
                        <VStack gap="16" justify="Start">
                            {itemList}
                        </VStack>
                        <Button
                            className={cls.toggle}
                            data-testid="sidebar-toggle"
                            theme={ButtonThemes.PRIMARY}
                            onClick={onToggle}
                        >
                            {collapsed ? '>' : '<'}
                        </Button>
                        <VStack className={cls.actions} gap="10" role="navigation" maxWidth>
                            <ThemeSwitcher data-testid="theme-switcher" />
                            <TranslateSwitcher />
                        </VStack>
                    </aside>
                </BrowserView>
            }
            on={
                <aside
                    className={classNames(cls.SidebarRedesigned, { [cls.collapsed]: collapsed }, [className])}
                    data-testid="sidebar"
                >
                    <AppLogo className={cls.logo} />
                    <div className={cls.content} />
                </aside>
            }
        />
    );
});
