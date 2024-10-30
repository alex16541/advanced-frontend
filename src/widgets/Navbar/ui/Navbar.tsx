import { memo, useState } from 'react';

import { getAuthData } from '@/entity/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarButton } from '@/features/AvatarButton';
import { CreateArticleButton } from '@/features/CreateArticleButton';
import { NotificationsButton } from '@/features/NotificationsButton';
import LoginIcon from '@/shared/assets/svg/login.svg';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useAppSelector(getAuthData);

    if (authData) {
        return (
            <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
                <nav className={cls.links}>
                    <HStack gap="10">
                        <CreateArticleButton />
                        <NotificationsButton direction="bottom left" />
                        <AvatarButton />
                    </HStack>
                </nav>
            </header>
        );
    }

    return (
        <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
            <nav className={cls.links}>
                <Icon Svg={LoginIcon} clickable onClick={() => setIsAuthModal(true)} />

                <LoginModal
                    isOpen={isAuthModal}
                    onClose={() => setIsAuthModal(false)}
                    onSuccess={() => setIsAuthModal(false)}
                />
            </nav>
        </header>
    );
});
