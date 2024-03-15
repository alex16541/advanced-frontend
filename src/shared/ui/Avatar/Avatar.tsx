import { CSSProperties, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Avatar.module.scss';

export enum AvatarSize {
    XS= 30,
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
}

export const Avatar = (props: AvatarProps) => {
    const {
        className, src, alt, size = AvatarSize.M, rounded = false,
    } = props;

    const avatarStyle = useMemo<CSSProperties>(
        () => ({
            height: size,
            width: size,
        }),
        [size],
    );

    return (
        <img
            alt={alt}
            className={classNames(cls.Avatar, { [cls.rounded]: rounded }, [className])}
            src={src}
            style={avatarStyle}
        />
    );
};
