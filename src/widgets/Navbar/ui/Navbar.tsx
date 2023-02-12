import { useTheme } from "app/providers/themeProvider";
import { Link } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkThemes } from "shared/ui/AppLink/AppLink";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <nav className={cls.links}>
                <ThemeSwitcher />
                <AppLink to={'/'} theme={AppLinkThemes.SECONDARY} >main</AppLink>
                <AppLink to={'/about'} theme={AppLinkThemes.SECONDARY} >about</AppLink>
            </nav>
        </div>
    );
}