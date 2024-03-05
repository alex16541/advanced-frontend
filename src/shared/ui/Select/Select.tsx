import {
    ChangeEvent, HTMLAttributes, useMemo,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
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
    value?: T;
    onChangeValue?: (value: T) => void;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className, label, options, readonly, defaultValue, value, onChangeValue, ...otherProps
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
                defaultValue={defaultValue}
                value={value}
                disabled={readonly}
                onChange={onChangeHendler}
            >
                {defaultValue && (
                    <option className={cls.option} key={defaultValue.toString()} value={defaultValue}>
                        {defaultValue}
                    </option>
                )}
                {optionList}
            </select>
        </div>
    );
};
