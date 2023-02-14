import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkThemes } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <nav className={cls.links}>
                <AppLink
                    to="/"
                    theme={AppLinkThemes.SECONDARY}
                >
                    {t('main-page-title')}
                </AppLink>
                <AppLink
                    to="/about"
                    theme={AppLinkThemes.SECONDARY}
                >
                    {t('about-page-title')}
                </AppLink>
            </nav>
        </div>
    );
};
