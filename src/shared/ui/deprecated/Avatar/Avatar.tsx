import { CSSProperties, useMemo } from 'react';

import UserAvatar from '@/shared/assets/svg/user.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import { AppImage } from '../../redesigned/AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

import cls from './Avatar.module.scss';

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export enum AvatarSize {
    XS = 30,
    S = 50,
    M = 70,
    L = 100,
    XL = 120,
}

interface AvatarProps {
    className?: string;
    src: string;
    size?: number | AvatarSize;
    alt: string;
    rounded?: boolean;
    contrast?: boolean;
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const { className, src, alt, size = AvatarSize.M, rounded = false, contrast = false } = props;

    const avatarStyle = useMemo<CSSProperties>(
        () => ({
            height: size,
            width: size,
        }),
        [size],
    );

    const skeleton = <Skeleton height={size} width={size} />;
    const defaultAvatar = (
        <Icon
            className={classNames(cls.icon, { [cls.contrast]: contrast }, [])}
            height={size}
            Svg={UserAvatar}
            width={size}
        />
    );

    return (
        <AppImage
            alt={alt}
            className={classNames(cls.Avatar, { [cls.rounded]: rounded }, [className])}
            errorFallback={defaultAvatar}
            fallbeck={skeleton}
            src={src}
            style={avatarStyle}
        />
    );
};
