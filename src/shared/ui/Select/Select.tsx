import {
    ChangeEvent, FC, HTMLAttributes, memo, useMemo,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption<T> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> extends HTMLAttributes<HTMLSelectElement> {
    className?: string;
    label?: string;
    options: SelectOption<T>[];
    readonly?: boolean;
    placeholder?: string;
    value?: T;
    onChangeValue?: (value: T) => void;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className, label, options, readonly, placeholder, value, onChangeValue, ...otherProps
    } = props;

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    const optionList = useMemo(
        () => options.map((opt) => (
            <option className={cls.option} key={opt.value} value={opt.value}>
                {opt.content}
            </option>
        )),
        [options],
    );

    const onChangeHendler = (event: ChangeEvent<HTMLSelectElement>) => {
        onChangeValue?.(event.target.value as T);
    };

    return (
        <div className={classNames(cls.Select, mods, [className])}>
            {label && <div className={cls.label}>{label}</div>}
            <select
                className={cls.input}
                placeholder={placeholder}
                value={value}
                disabled={readonly}
                onChange={onChangeHendler}
            >
                {optionList}
            </select>
        </div>
    );
};
