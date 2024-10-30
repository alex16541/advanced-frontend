import { Listbox } from '@headlessui/react';
import { ReactNode, useMemo } from 'react';

import ArrowIcon from '@/shared/assets/svg/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PopupDirection } from '@/shared/types/ui';

import { Button, ButtonSize, ButtonVariant } from '../../../Button';
import { Icon } from '../../../Icon';
import { HStack } from '../../../Stack';
import { FlexJustify } from '../../../Stack/Flex/model/types';
import { Text } from '../../../Text';
import { directionClassName } from '../../styles/consts';
import clsPopup from '../../styles/popup.module.scss';
import { ListBoxOption } from '../../types/listBox';

import cls from './ListBox.module.scss';

interface ListBoxProps<T> {
    className?: string;
    classNameWrapper?: string;
    classNameButton?: string;
    classNameOptions?: string;
    buttonAlign?: FlexJustify;
    buttonVariant?: ButtonVariant;
    defaultValue?: ReactNode;
    value?: T;
    options?: ListBoxOption<T>[];
    onChange?: (value: T) => void;
    setIsOpen?: (value: boolean) => void;
    onMouseMove?(e: React.MouseEvent<HTMLDivElement>): void;
    label?: string;
    disabled?: boolean;
    direction?: PopupDirection;
    size?: ButtonSize;
    showArrow?: boolean;
}

const ListBoxComponent = <T extends string>(props: ListBoxProps<T>) => {
    const {
        buttonAlign = 'SpaceBetween',
        buttonVariant = 'primary',
        className,
        classNameWrapper,
        classNameButton,
        classNameOptions,
        defaultValue = 'Открыть',
        value,
        options = [],
        onChange = (value: T) => {},
        onMouseMove = () => {},
        label,
        disabled = false,
        direction = 'bottom right',
        size = 'm',
        showArrow = true,
        setIsOpen,
    } = props;

    const directionClass = directionClassName[direction];
    const displayValue = useMemo(() => options.find((opt) => opt.value === value), [options, value]);

    const listBox = (
        <div className={classNames(cls.ListBoxWrapper, {}, [classNameWrapper, clsPopup.Popup])}>
            <Listbox
                as="div"
                className={classNames(cls.ListBox, {}, [className])}
                disabled={disabled}
                value={value}
                onChange={onChange}
                onMouseMove={onMouseMove}
            >
                {({ open }) => {
                    setIsOpen?.(open);

                    return (
                        <>
                            <Listbox.Button as="div" className={classNames('', {}, [clsPopup.Button])}>
                                {/* todo: Вынести кнопку в пропсы */}
                                <Button
                                    align={buttonAlign}
                                    disabled={disabled}
                                    size={size}
                                    theme={buttonVariant}
                                    addonRight={
                                        showArrow ? (
                                            <Icon className={cls.ArrowIcon} Svg={ArrowIcon} />
                                        ) : undefined
                                    }
                                    className={classNames(cls.Button, { [cls.open]: open }, [
                                        classNameButton,
                                    ])}
                                >
                                    {displayValue ? displayValue.content : defaultValue}
                                </Button>
                            </Listbox.Button>
                            <Listbox.Options
                                className={classNames(cls.Options, {}, [
                                    classNameOptions,
                                    clsPopup.Content,
                                    directionClass,
                                ])}
                            >
                                {options.map((option) => (
                                    <Listbox.Option
                                        disabled={option.disabled}
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {({ active, selected }) => (
                                            <span
                                                className={classNames(cls.Option, {
                                                    [cls.active]: active,
                                                    [cls.selected]: selected,
                                                    [cls.disabled]: option.disabled,
                                                })}
                                            >
                                                {option.content}
                                            </span>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </>
                    );
                }}
            </Listbox>
        </div>
    );

    if (label) {
        return (
            <HStack>
                <Text text={`${label}: `} />
                {listBox}
            </HStack>
        );
    }

    return listBox;
};

export { ListBoxComponent as ListBox };
