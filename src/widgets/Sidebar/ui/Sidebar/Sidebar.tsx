import { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { TranslateSwitcher } from 'widgets/LangSwitcher';
import { AppLink, AppLinkThemes } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import ListIcon from 'shared/assets/svg/list.svg';
import HomeIcon from 'shared/assets/svg/home.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;
    const [collapsed, setCollapsed] = useState(false);
    const { t, i18n } = useTranslation();

    function onToggle() {
        setCollapsed((value) => !value);
    }

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <div
                className={cls.content}
            >
                <AppLink
                    className={cls.item}
                    to={RoutePath.main}
                    theme={AppLinkThemes.SECONDARY}
                >
                    <HomeIcon className={cls.icon} />
                    <div className={cls.link}>{t('main-page-title')}</div>
                </AppLink>
                <AppLink
                    className={cls.item}
                    to={RoutePath.about}
                    theme={AppLinkThemes.SECONDARY}
                >
                    <ListIcon className={cls.icon} />
                    <div className={cls.link}>{t('about-page-title')}</div>
                </AppLink>
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
