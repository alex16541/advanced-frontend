import { ButtonHTMLAttributes, forwardRef, memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Loader } from '../../Loader';

import cls from './Button.module.scss';

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export enum ButtonThemes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    CLEAR = 'clear',
    OUTLINED = 'outlined',
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export enum ButtonSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export enum ButtonColor {
    DEFAULT = 'default',
    RED = 'red',
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
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

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
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
            disabled={disabled || isLoading}
            ref={ref}
            type="button"
            className={classNames(cls.Button, mods, [
                className,
                cls[theme],
                cls[size],
                cls[color],
                cls[align],
            ])}
            {...otherProps}
        >
            <div className={cls.body}>
                <div className={cls.content}>{children}</div>
                {isLoading && <Loader className={cls.loader} />}
            </div>
        </button>
    );
});

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
const Memoized = memo(Button);

export { Memoized as Button };
