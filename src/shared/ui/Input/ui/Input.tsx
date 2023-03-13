import { classNames } from 'shared/lib/classNames/classNames';
import React, { FC, InputHTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';

export enum InputThemes {
    PRIMARY = 'primary',
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string;
    theme?: InputThemes;
    value?: string
    onChange?: (value: string) => void;
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
    const {
        className,
        theme = InputThemes.PRIMARY,
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
});
