import { classNames } from 'shared/lib/classNames/classNames';
import { FC, ButtonHTMLAttributes } from 'react';
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

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonThemes;
    size?: ButtonSize;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme = ButtonThemes.PRIMARY,
        type,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    const mods = {};

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[theme], size])}
            {...otherProps}
        >
            {children}
        </button>
    );
};
