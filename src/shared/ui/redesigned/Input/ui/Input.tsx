import React, { InputHTMLAttributes, memo, ReactElement, useState } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import { Loader } from '../../../deprecated/Loader';

import cls from './Input.module.scss';

export enum InputThemes {
    PRIMARY = 'primary',
    CLEAR = 'clear',
}

type InputSize = 's' | 'm';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'readOnly' | 'size' | 'type'>;

interface InputPropsBase extends HTMLInputProps {
    className?: string;
    classNameInput?: string;
    theme?: InputThemes;
    value?: string | number;
    readonly?: boolean;
    isLoading?: boolean;
    fullWidth?: boolean;
    addonLeft?: ReactElement;
    addonRight?: ReactElement;
    size?: InputSize;
    label?: string;
}

interface StringInputProps extends InputPropsBase {
    type?: 'text' | 'number' | 'password';
    onChange?: (value: string) => void;
}

interface FileInputProps extends InputPropsBase {
    type: 'file';
    onChange?: (files: FileList | null) => void;
}

type InputProps = StringInputProps | FileInputProps;

const Input = (props: InputProps) => {
    const {
        className,
        classNameInput,
        theme = InputThemes.PRIMARY,
        value,
        readonly = false,
        type = 'text',
        isLoading,
        fullWidth,
        addonLeft,
        addonRight,
        size = 'm',
        label = type === 'file' ? 'Upload file' : undefined,
        ...otherProps
    } = props;

    const [fileName, setFileName] = useState('');

    function onChangeHendler(e: React.ChangeEvent<HTMLInputElement>) {
        if (type === 'file') {
            const { onChange } = props as FileInputProps;
            const pathParts = e.target.value.split('\\');
            setFileName(pathParts[pathParts.length - 1]);
            onChange?.(e.target.files);
        } else {
            const { onChange } = props as StringInputProps;
            onChange?.(e.target.value);
        }
    }

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.fullWidth]: fullWidth,
        [cls.addonLeft]: Boolean(addonLeft),
        [cls.addonRight]: Boolean(addonRight),
    };

    const input = (
        <div className={classNames(cls.InputWrapper, mods, [cls[theme], cls[size], className])}>
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
                        {...otherProps}
                        onChange={onChangeHendler}
                    />
                    {type === 'file' && fileName && <div className={cls.fileName}>{fileName}</div>}
                    {addonRight}
                </>
            )}
        </div>
    );

    if (label || type === 'file') {
        return (
            <>
                {label && (
                    <label className={cls.Label}>
                        {`${label}:`}
                        {input}
                    </label>
                )}
            </>
        );
    }

    return input;
};

const Memoized = memo(Input);

export { Memoized as Input };
