import { LoginModal } from 'features/AuthByUsername';
import { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData, userActions } from 'entity/User';
import { Text } from 'shared/ui/Text/Text';
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
            <div className={classNames(cls.Navbar, {}, [className])}>
                <nav className={cls.links}>
                    <Button theme={ButtonThemes.PRIMARY}>/</Button>
                    <Button
                        theme={ButtonThemes.PRIMARY}
                        onClick={logout}
                    >
                        {t('logout')}
                    </Button>
                </nav>
            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <nav className={cls.links}>
                <div>/</div>
                <Button
                    theme={ButtonThemes.PRIMARY}
                    onClick={() => setIsAuthModal(true)}
                >
                    {t('login')}
                </Button>

                <LoginModal
                    isOpen={isAuthModal}
                    onClose={() => setIsAuthModal(false)}
                    onSuccess={() => setIsAuthModal(false)}
                />
            </nav>
        </div>
    );
});
