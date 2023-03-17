import { classNames } from 'shared/lib/classNames/classNames';
import { FC, ButtonHTMLAttributes, memo } from 'react';
import cls from './Button.module.scss';

export enum ButtonThemes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    CLEAR = 'clear',
    OUTLINED = 'outlined',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

export enum ButtonColor {
    DEFAULT = 'default',
    RED = 'red',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonThemes;
    size?: ButtonSize;
    color?: ButtonColor;
}

export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonThemes.PRIMARY,
        type,
        size = ButtonSize.M,
        color = ButtonColor.DEFAULT,
        ...otherProps
    } = props;

    const mods = {
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [
                className,
                cls[theme],
                cls[size],
                cls[color],
            ])}
            {...otherProps}
        >
            {children}
        </button>
    );
});
