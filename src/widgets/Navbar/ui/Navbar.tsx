import { getAuthData, userActions } from 'entity/User';
import { LoginModal } from 'features/AuthByUsername';
import { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = memo((props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation('navbar');
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
                    <Dropdown
                        target={(
                            <Avatar
                                src={authData.avatar ?? ''}
                                alt={authData.username}
                                size={AvatarSize.XS}
                            />
                        )}
                        direction="bottom left"
                        items={[
                            { content: t('profile'), href: `/profile/${authData.id}` },
                            { content: t('logout'), onClick: logout },
                        ]}
                    />
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
