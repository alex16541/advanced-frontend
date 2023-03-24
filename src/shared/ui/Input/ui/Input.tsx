import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { FC, InputHTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';

export enum InputThemes {
    PRIMARY = 'primary',
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
    className?: string;
    theme?: InputThemes;
    value?: string | number;
    readonly?: boolean;
    onChange?: (value: string) => void;
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
    const {
        className,
        theme = InputThemes.PRIMARY,
        value,
        onChange,
        readonly = false,
        ...otherProps
    } = props;

    function onChangeHendler(e: React.ChangeEvent<HTMLInputElement>) {
        onChange?.(e.target.value);
    }

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    return (
        <input
            className={classNames(cls.Input, mods, [cls[theme], className])}
            type="text"
            value={value}
            onChange={onChangeHendler}
            readOnly={readonly}
            {...otherProps}
        />
    );
});