import { getAuthData, userActions } from 'entity/User';
import { LoginModal } from 'features/AuthByUsername';
import { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = memo((props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getAuthData);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userActions.logout());
    };

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <nav className={cls.links}>
                    <Button theme={ButtonThemes.PRIMARY}>/</Button>
                    <Button theme={ButtonThemes.PRIMARY} onClick={logout}>
                        {t('logout')}
                    </Button>
                </nav>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <nav className={cls.links}>
                <div>/</div>
                <Button theme={ButtonThemes.PRIMARY} onClick={() => setIsAuthModal(true)}>
                    {t('login')}
                </Button>

                <LoginModal
                    isOpen={isAuthModal}
                    onClose={() => setIsAuthModal(false)}
                    onSuccess={() => setIsAuthModal(false)}
                />
            </nav>
        </header>
    );
});
