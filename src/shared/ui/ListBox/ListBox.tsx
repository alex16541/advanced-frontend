import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, useMemo, useState } from 'react';
import { Listbox } from '@headlessui/react';
import CheckSvg from 'shared/assets/svg/check.svg';
import cls from './ListBox.module.scss';
import { Button } from '../Button';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';

export interface ListBoxOption<T> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T> {
    className?: string;
    wrapperClassName?: string;
    defaultValue?: ReactNode;
    value?: T;
    options?: ListBoxOption<T>[];
    onChange?: (value: T) => void;
    label?: string;
    disabled?: boolean;
}

const ListBoxComponent = <T extends string>(props: ListBoxProps<T>) => {
    const {
        className,
        wrapperClassName,
        defaultValue = 'Открыть',
        value,
        options = [],
        onChange = (value: T) => {},
        label,
        disabled = false,
    } = props;

    const displayValue = useMemo(() => options.find((opt) => opt.value === value), [options, value]);

    return (
        <div className={classNames(cls.ListBoxWrapper, {}, [wrapperClassName])}>
            {label && <Text text={`${label}: `} />}
            <Listbox
                value={value}
                onChange={onChange}
                as="div"
                className={classNames(cls.ListBox, {}, [className])}
                disabled={disabled}
            >
                <Listbox.Button
                    as="div"
                    className={cls.ButtonWrapper}
                >
                    <Button className={cls.Button} disabled={disabled}>
                        {displayValue ? displayValue.content : defaultValue}
                    </Button>
                </Listbox.Button>
                <Listbox.Options
                    className={cls.Options}
                >
                    {options.map((option) => (
                        <Listbox.Option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {({ active, selected }) => (
                                <span
                                    className={
                                        classNames(cls.Option, {
                                            [cls.active]: active,
                                            [cls.selected]: selected,
                                            [cls.disabled]: option.disabled,
                                        })
                                    }
                                >
                                    {selected && <Icon Svg={CheckSvg} className={cls.Icon} />}
                                    {option.content}
                                </span>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
};

export { ListBoxComponent as ListBox };
