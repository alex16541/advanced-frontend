import { ButtonHTMLAttributes, forwardRef, memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Loader } from '../../../deprecated/Loader';
import { ButtonAlign, ButtonColor, ButtonSize, ButtonVariant } from '../types';

import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonVariant;
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
        theme = 'primary',
        type,
        size = 'm',
        color = 'default',
        align = 'center',
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

const Memoized = memo(Button);

export { Memoized as Button };
