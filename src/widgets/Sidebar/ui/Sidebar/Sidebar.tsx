import { memo, useMemo, useState } from 'react';
import { BrowserView } from 'react-device-detect';
import { useSelector } from 'react-redux';

import { TranslateSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import ArrowIcon from '@/shared/assets/svg/arrow.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import { Button, ButtonThemes } from '@/shared/ui/deprecated/Button';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { selectSidebarItems } from '../../model/selectors/selectSidebarItems/selectSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { SidebarItem as SidebarItemDeprecated } from '../SidebarItemDeprecated/SidebarItem';

import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItems = useSelector(selectSidebarItems);

    const itemList = useMemo(
        () =>
            sidebarItems.map((item) => (
                <FeatureToggle
                    feature="isRedesignedApp"
                    key={item.path}
                    off={<SidebarItemDeprecated collapsed={collapsed} item={item} />}
                    on={<SidebarItem collapsed={collapsed} item={item} />}
                />
            )),
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
                    <div className={cls.content}>
                        <VStack gap="8">{itemList}</VStack>
                    </div>
                    <div className={cls.toggle}>
                        <Icon className={cls.toggleButton} Svg={ArrowIcon} clickable onClick={onToggle} />
                    </div>
                    <div />
                    <div className={cls.actions}>
                        <ThemeSwitcher data-testid="theme-switcher" />
                        <TranslateSwitcher />
                    </div>
                </aside>
            }
        />
    );
});
