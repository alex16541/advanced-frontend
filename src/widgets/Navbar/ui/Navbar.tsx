import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getAuthData } from '@/entity/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarButton } from '@/features/AvatarButton';
import { NotificationsButton } from '@/features/NotificationsButton';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/FeatureToggle/FeatureToggle';
import { Button, ButtonThemes } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

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
            <FeatureToggle
                feature="isRedesignedApp"
                off={
                    <header className={classNames(cls.Navbar, {}, [className])}>
                        <nav className={cls.links}>
                            <Button theme={ButtonThemes.PRIMARY}>/</Button>
                            <HStack gap="10">
                                <NotificationsButton direction="bottom left" />
                                <AvatarButton />
                            </HStack>
                        </nav>
                    </header>
                }
                on={
                    <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
                        <nav className={cls.links}>
                            <HStack gap="10">
                                <NotificationsButton direction="bottom left" />
                                <AvatarButton />
                            </HStack>
                        </nav>
                    </header>
                }
            />
        );
    }

    return (
        <FeatureToggle
            feature="isRedesignedApp"
            off={
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
            }
            on={
                <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
                    <nav className={cls.links}>
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
            }
        />
    );
});
