import { classNames } from 'shared/lib/classNames/classNames';
import {
    FC, ButtonHTMLAttributes, memo, ReactNode, ReactElement,
} from 'react';
import { Loader } from 'shared/ui/Loader';
import cls from './Button.module.scss';

export enum ButtonThemes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    CLEAR = 'clear',
    OUTLINED = 'outlined',
}

export enum ButtonSize {
    S = 'size_s',
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
    isLoading?: boolean;
}

export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonThemes.PRIMARY,
        type,
        size = ButtonSize.M,
        color = ButtonColor.DEFAULT,
        isLoading,
        disabled,
        ...otherProps
    } = props;

    const mods = {
        [cls.loading]: isLoading,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[theme], cls[size], cls[color]])}
            disabled={disabled || isLoading}
            {...otherProps}
        >
            <div className={cls.body}>
                <div className={cls.content}>{children}</div>
                {isLoading && <Loader className={cls.loader} />}
            </div>
        </button>
    );
});
