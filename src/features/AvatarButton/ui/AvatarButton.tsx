import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { getAuthData, getIsUserAdmin, getIsUserManager, userActions } from '@/entity/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import { PopupDirection } from '@/shared/types/ui';
import {
    Avatar as AvatarDeprecated,
    AvatarSize as AvatarSizeDeprecated,
} from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';

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
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <DropdownDeprecated
                    className={classNames(cls.AvatarButton, {}, [className])}
                    direction={direction}
                    button={
                        <AvatarDeprecated
                            alt={authData.username}
                            size={AvatarSizeDeprecated.XS}
                            src={authData.avatar ?? ''}
                            contrast
                        />
                    }
                    items={[
                        { content: t('profile'), href: `/profile/${authData.id}` },
                        { content: t('Settings'), href: '/settings' },
                        ...(isShowAdminButton ? [{ content: t('admin'), href: '/admin' }] : []),
                        { content: t('logout'), onClick: logout },
                    ]}
                />
            }
            on={
                <Dropdown
                    button={<Avatar alt={authData.username} size={50} src={authData.avatar ?? ''} />}
                    className={classNames(cls.AvatarButton, {}, [className])}
                    direction={direction}
                    items={[
                        { content: t('profile'), href: `/profile/${authData.id}` },
                        { content: t('Settings'), href: '/settings' },
                        ...(isShowAdminButton ? [{ content: t('admin'), href: '/admin' }] : []),
                        { isDelimiter: true },
                        { content: t('logout'), onClick: logout },
                    ]}
                />
            }
        />
    );
};

const Memoized = memo(AvatarButton);

export { Memoized as AvatarButton };
