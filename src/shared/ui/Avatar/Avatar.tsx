import { CSSProperties, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src: string;
    size: number;
    alt: string;
    rounded?: boolean;
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        alt,
        size = 50,
        rounded = false,
    } = props;

    const avatarStyle = useMemo<CSSProperties>(() => ({
        height: size,
        width: size,
    }), [size]);

    return (
        <img
            src={src}
            alt={alt}
            style={avatarStyle}
            className={classNames(cls.Avatar, { [cls.rounded]: rounded }, [className])}
        />
    );
};
