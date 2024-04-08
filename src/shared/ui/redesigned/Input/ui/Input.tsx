import React, { InputHTMLAttributes, memo, ReactElement } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import { Loader } from '../../../deprecated/Loader';

import cls from './Input.module.scss';

export enum InputThemes {
    PRIMARY = 'primary',
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    classNameInput?: string;
    theme?: InputThemes;
    value?: string | number;
    readonly?: boolean;
    onChange?: (value: string) => void;
    isLoading?: boolean;
    fullWidth?: boolean;
    addonLeft?: ReactElement;
    addonRight?: ReactElement;
}

const Input = (props: InputProps) => {
    const {
        className,
        classNameInput,
        theme = InputThemes.PRIMARY,
        value,
        onChange,
        readonly = false,
        type = 'text',
        isLoading,
        fullWidth,
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    function onChangeHendler(e: React.ChangeEvent<HTMLInputElement>) {
        onChange?.(e.target.value);
    }

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.fullWidth]: fullWidth,
        [cls.addonLeft]: Boolean(addonLeft),
        [cls.addonRight]: Boolean(addonRight),
    };

    return (
        <div className={classNames(cls.InputWrapper, mods, [cls[theme], className])}>
            {isLoading ? (
                <Loader className={cls.loader} />
            ) : (
                <>
                    {addonLeft}
                    <input
                        className={classNames(cls.Input, {}, [classNameInput])}
                        readOnly={readonly}
                        type={type}
                        value={value}
                        onChange={onChangeHendler}
                        {...otherProps}
                    />
                    {addonRight}
                </>
            )}
        </div>
    );
};

const Memoized = memo(Input);

export { Memoized as Input };
