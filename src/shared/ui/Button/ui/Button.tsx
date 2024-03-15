import {
    ButtonHTMLAttributes, forwardRef, memo, ReactNode,
} from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Loader } from '../../../ui/Loader';

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

export enum ButtonAlign {
    START = 'align_start',
    CENTER = 'align_center',
    END = 'align_end',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonThemes;
    size?: ButtonSize;
    color?: ButtonColor;
    align?: ButtonAlign;
    isLoading?: boolean;
    children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        className,
        children,
        theme = ButtonThemes.PRIMARY,
        type,
        size = ButtonSize.M,
        color = ButtonColor.DEFAULT,
        align = ButtonAlign.CENTER,
        isLoading,
        disabled,
        ...otherProps
    } = props;

    const mods = {
        [cls.loading]: isLoading,
    };

    return (
        <button
            className={classNames(cls.Button, mods, [className, cls[theme], cls[size], cls[color], cls[align]])}
            disabled={disabled || isLoading}
            ref={ref}
            type="button"
            {...otherProps}
        >
            <div className={cls.body}>
                <div className={cls.content}>{children}</div>
                {isLoading && <Loader className={cls.loader} />}
            </div>
        </button>
    );
});

const Memoized = memo(Button);

export { Memoized as Button };
