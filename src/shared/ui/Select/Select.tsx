import {
    ChangeEvent, ChangeEventHandler, createRef, FC, HTMLAttributes, memo, useMemo,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
    className?: string;
    label?: string;
    options: SelectOption[];
    readonly?: boolean;
    placeholder?: string;
    value?: string;
    onChangeValue?: (value: string) => void;
}

export const Select: FC<SelectProps> = memo((props: SelectProps) => {
    const {
        className,
        label,
        options,
        readonly,
        placeholder,
        onChangeValue,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    const optionList = useMemo(() => options.map((opt) => (
        <option
            className={cls.option}
            key={opt.value}
            value={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    const onChangeHendler = (event: ChangeEvent<HTMLSelectElement>) => {
        onChangeValue?.(event.target.value);
    };

    return (
        <div className={cls.wrapper}>
            {label && <div className={cls.label}>{label}</div>}
            <select
                placeholder={placeholder}
                disabled={readonly}
                className={classNames(cls.Select, mods, [className])}
                onChange={onChangeHendler}
            >
                {optionList}
            </select>
        </div>
    );
});
