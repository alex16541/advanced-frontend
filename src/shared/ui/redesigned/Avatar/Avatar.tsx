import { CSSProperties, useMemo } from 'react';

import UserAvatar from '@/shared/assets/svg/user.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import { AppImage } from '../AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

import cls from './Avatar.module.scss';

export type AvatarSize = 30 | 32 | 50 | 70 | 100 | 120;

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number | AvatarSize;
    alt: string;
    rounded?: boolean;
}

export const Avatar = (props: AvatarProps) => {
    const { className, src, alt, size = 70, rounded = false } = props;

    const avatarStyle = useMemo<CSSProperties>(
        () => ({
            height: size,
            width: size,
        }),
        [size],
    );

    const skeleton = <Skeleton height={size} width={size} />;
    const defaultAvatar = <Icon className={cls.icon} height={size} Svg={UserAvatar} width={size} />;

    return (
        <AppImage
            alt={alt}
            className={classNames(cls.Avatar, { [cls.rounded]: rounded }, [className])}
            errorFallback={defaultAvatar}
            fallback={skeleton}
            src={src}
            style={avatarStyle}
        />
    );
};
