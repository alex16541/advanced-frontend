import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkThemes } from "shared/ui/AppLink/AppLink";
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <nav className={cls.links}>
                <AppLink to={'/'} theme={AppLinkThemes.SECONDARY} >main</AppLink>
                <AppLink to={'/about'} theme={AppLinkThemes.SECONDARY} >about</AppLink>
            </nav>
        </div>
    );
}