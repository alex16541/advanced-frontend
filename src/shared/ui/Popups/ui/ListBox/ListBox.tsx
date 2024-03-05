import { classNames } from '@/shared/lib/classNames/classNames';
import { ReactNode, useMemo } from 'react';
import { Listbox } from '@headlessui/react';
import CheckSvg from '@/shared/assets/svg/check.svg';
import { PopupDirection } from '@/shared/types/ui';
import cls from './ListBox.module.scss';
import clsPopup from '../../styles/popup.module.scss';
import { Button } from '../../../Button';
import { Text } from '../../../Text/Text';
import { Icon } from '../../../Icon/Icon';
import { ListBoxOption } from '../../types/listBox';
import { directionClassName } from '../../styles/consts';

interface ListBoxProps<T> {
    className?: string;
    wrapperClassName?: string;
    defaultValue?: ReactNode;
    value?: T;
    options?: ListBoxOption<T>[];
    onChange?: (value: T) => void;
    label?: string;
    disabled?: boolean;
    direction?: PopupDirection;
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
        direction = 'bottom right',
    } = props;

    const directionClass = directionClassName[direction];
    const displayValue = useMemo(() => options.find((opt) => opt.value === value), [options, value]);

    return (
        <div className={classNames(cls.ListBoxWrapper, {}, [wrapperClassName, clsPopup.Popup])}>
            {label && <Text text={`${label}: `} />}
            <Listbox
                className={classNames(cls.ListBox, {}, [className])}
                value={value}
                onChange={onChange}
                as="div"
                disabled={disabled}
            >
                <Listbox.Button
                    className={classNames(cls.Button, {}, [clsPopup.Button])}
                    as="div"
                >
                    <Button className={cls.Button} disabled={disabled}>
                        {displayValue ? displayValue.content : defaultValue}
                    </Button>
                </Listbox.Button>
                <Listbox.Options
                    className={classNames(cls.Options, {}, [clsPopup.Content, directionClass])}
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
