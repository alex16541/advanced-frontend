import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { getAuthData, getIsUserAdmin, getIsUserManager, userActions } from '@/entity/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PopupDirection } from '@/shared/types/ui';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';

import cls from './AvatarButton.module.scss';
import '../i18n/i18n';

interface AvatarButtonProps {
    className?: string;
    direction?: PopupDirection;
}

const AvatarButton = (props: AvatarButtonProps) => {
    const { className, direction = 'bottom left' } = props;
    const { t } = useTranslation('AvatarButton');
    const authData = useAppSelector(getAuthData);
    const isUserAdmin = useAppSelector(getIsUserAdmin);
    const isUserManager = useAppSelector(getIsUserManager);
    const isShowAdminButton = isUserAdmin || isUserManager;
    const dispatch = useAppDispatch();
    const logout = () => {
        dispatch(userActions.logout());
    };

    if (!authData) return null;

    return (
        <Dropdown
            button={<Avatar alt={authData.username} size={50} src={authData.avatar ?? ''} />}
            className={classNames(cls.AvatarButton, {}, [className])}
            direction={direction}
            items={[
                { content: t('Profile'), href: `/profile/${authData.id}` },
                { content: t('Settings'), href: '/settings' },
                ...(isShowAdminButton ? [{ content: t('Admin'), href: '/admin' }] : []),
                { isDelimiter: true },
                { content: t('Logout'), onClick: logout },
            ]}
        />
    );
};

const Memoized = memo(AvatarButton);

export { Memoized as AvatarButton };
