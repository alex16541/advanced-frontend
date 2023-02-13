import { classNames } from 'shared/lib/classNames/classNames';
import { FC, ButtonHTMLAttributes } from 'react';
import cls from './Button.module.scss';

export enum ButtonThemes {
    CLEAR = 'clear',
    CLEAR_INVERT = 'clear-invert',
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonThemes;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme = ButtonThemes.PRIMARY,
        type,
        ...otherProps
    } = props;

    return (
        <button
            type="button"
            className={classNames(cls.Button, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </button>
    );
};
