import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown } from '@/shared/ui/Popups';
import { Avatar, AvatarSize } from '@/shared/ui/Avatar';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import {
    getAuthData, getIsUserAdmin, getIsUserManager, userActions,
} from '@/entity/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { PopupDirection } from '@/shared/types/ui';
import cls from './AvatarButton.module.scss';

interface AvatarButtonProps {
    className?: string;
    direction?: PopupDirection;
}

const AvatarButton = (props: AvatarButtonProps) => {
    const { className, direction = 'bottom left' } = props;
    const { t } = useTranslation('navbar');
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
            className={classNames(cls.AvatarButton, {}, [className])}
            button={(
                <Avatar
                    src={authData.avatar ?? ''}
                    alt={authData.username}
                    size={AvatarSize.XS}
                />
            )}
            direction={direction}
            items={[
                { content: t('profile'), href: `/profile/${authData.id}` },
                ...(isShowAdminButton ? [{ content: t('admin'), href: '/admin' }] : []),
                { content: t('logout'), onClick: logout },
            ]}
        />
    );
};

const Memoized = memo(AvatarButton);

export { Memoized as AvatarButton };