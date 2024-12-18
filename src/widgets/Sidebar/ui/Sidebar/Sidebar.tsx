import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { TranslateSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import ArrowIcon from '@/shared/assets/svg/arrow.svg';
import { SIDEBAR_STATE_KEY } from '@/shared/consts/localstorage';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { selectSidebarItems } from '../../model/selectors/selectSidebarItems/selectSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import cls from './Sidebar.module.scss';

import '../../i18n/i18n';

interface SidebarProps {
    className?: string;
}

const setSidebarState = (value: boolean) => localStorage.setItem(SIDEBAR_STATE_KEY, String(value));
const getSidebarState = () => localStorage.getItem(SIDEBAR_STATE_KEY) === 'true';

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;
    const [collapsed, setCollapsed] = useState(getSidebarState());
    const sidebarItems = useSelector(selectSidebarItems);

    const itemList = useMemo(
        () => sidebarItems.map((item) => <SidebarItem collapsed={collapsed} item={item} key={item.path} />),
        [collapsed, sidebarItems],
    );

    function onToggle() {
        setCollapsed((value) => !value);
        setSidebarState(!collapsed);
    }

    return (
        <aside
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
            data-testid="sidebar"
        >
            <AppLogo className={cls.logo} />
            <div className={cls.content}>
                <VStack gap="8">{itemList}</VStack>
            </div>
            <div className={cls.toggle}>
                <Icon
                    className={cls.toggleButton}
                    dataTestid="sidebar-toggle"
                    Svg={ArrowIcon}
                    clickable
                    onClick={onToggle}
                />
            </div>
            <div />
            <div className={cls.actions}>
                <ThemeSwitcher data-testid="theme-switcher" />
                <TranslateSwitcher />
            </div>
        </aside>
    );
};
