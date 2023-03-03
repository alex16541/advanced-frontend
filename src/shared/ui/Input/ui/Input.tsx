import { classNames } from 'shared/lib/classNames/classNames';
import React, { InputHTMLAttributes } from 'react';
import cls from './Input.module.scss';

export enum InputThemes {
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string;
    theme?: InputThemes;
    value?: string
    onChange?: (valeu: string) => string;
}

export const Input = (props: InputProps) => {
    const {
        className,
        theme,
        value,
        onChange,
        ...otherProps
    } = props;

    function onChangeHendler(e: React.ChangeEvent<HTMLInputElement>) {
        onChange?.(e.target.value);
    }

    return (
        <input
            className={classNames(cls.Input, {}, [cls[theme], className])}
            type="text"
            value={value}
            onChange={onChangeHendler}
            {...otherProps}
        />
    );
};
