import { getAuthData } from 'entity/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { NotificationsButton } from 'features/NotificationsButton';
import { HStack } from 'shared/ui/Stack';
import { AvatarButton } from 'features/AvatarButton';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation('navbar');
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useAppSelector(getAuthData);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <nav className={cls.links}>
                    <Button theme={ButtonThemes.PRIMARY}>/</Button>
                    <HStack gap="10">
                        <NotificationsButton direction="bottom left" />
                        <AvatarButton />
                    </HStack>
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
