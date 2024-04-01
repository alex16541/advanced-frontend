import { Listbox } from '@headlessui/react';
import { ReactNode, useMemo } from 'react';

import CheckSvg from '@/shared/assets/svg/check.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PopupDirection } from '@/shared/types/ui';

import { Button, ButtonAlign } from '../../../Button';
import { Icon } from '../../../Icon/Icon';
import { Text } from '../../../Text/Text';
import { directionClassName } from '../../styles/consts';
import clsPopup from '../../styles/popup.module.scss';
import { ListBoxOption } from '../../types/listBox';

import cls from './ListBox.module.scss';

interface ListBoxProps<T> {
    className?: string;
    classNameWrapper?: string;
    classNameButton?: string;
    buttonAlign?: ButtonAlign;
    defaultValue?: ReactNode;
    value?: T;
    options?: ListBoxOption<T>[];
    onChange?: (value: T) => void;
    label?: string;
    disabled?: boolean;
    direction?: PopupDirection;
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
const ListBoxComponent = <T extends string>(props: ListBoxProps<T>) => {
    const {
        buttonAlign = ButtonAlign.START,
        className,
        classNameWrapper,
        classNameButton,
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
        <div className={classNames(cls.ListBoxWrapper, {}, [classNameWrapper, clsPopup.Popup])}>
            {label && <Text text={`${label}: `} />}
            <Listbox
                as="div"
                className={classNames(cls.ListBox, {}, [className])}
                disabled={disabled}
                value={value}
                onChange={onChange}
            >
                <Listbox.Button as="div" className={classNames(cls.Button, {}, [clsPopup.Button])}>
                    <Button
                        align={buttonAlign}
                        className={classNames(cls.Button, {}, [classNameButton])}
                        disabled={disabled}
                    >
                        {displayValue ? displayValue.content : defaultValue}
                    </Button>
                </Listbox.Button>
                <Listbox.Options className={classNames(cls.Options, {}, [clsPopup.Content, directionClass])}>
                    {options.map((option) => (
                        <Listbox.Option disabled={option.disabled} key={option.value} value={option.value}>
                            {({ active, selected }) => (
                                <span
                                    className={classNames(cls.Option, {
                                        [cls.active]: active,
                                        [cls.selected]: selected,
                                        [cls.disabled]: option.disabled,
                                    })}
                                >
                                    {selected && <Icon className={cls.Icon} Svg={CheckSvg} />}
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
