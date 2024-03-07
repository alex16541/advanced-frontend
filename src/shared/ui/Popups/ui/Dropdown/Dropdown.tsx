import { ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PopupDirection } from '@/shared/types/ui';
import cls from './Dropdown.module.scss';
import clsPopup from '../../styles/popup.module.scss';
import { Button } from '../../../Button';
import { AppLink, AppLinkThemes } from '../../../AppLink/AppLink';
import { DropdownItem } from '../../types/dropdown';
import { directionClassName } from '../../styles/consts';

interface DropdownProps {
    className?: string;
    button: ReactNode;
    items?: DropdownItem[]
    disabled?: boolean;
    direction?: PopupDirection;
}

export const Dropdown = (props: DropdownProps) => {
    const {
        className,
        button,
        items = [],
        disabled = false,
        direction = 'bottom right',
    } = props;

    const directionClass = directionClassName[direction];

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [clsPopup.Popup, className])}>
            <Menu.Button
                className={classNames(cls.Button, {}, [clsPopup.Button])}
                disabled={disabled}
            >
                {button}
            </Menu.Button>
            <Menu.Items as="div" className={classNames(cls.Items, {}, [clsPopup.Content, directionClass])}>
                {items.map((item, index) => {
                    const { onClick, href } = item;

                    // TODO: Добавить divider

                    if (onClick) {
                        return (
                            <Menu.Item
                                className={cls.Item}
                                as={Button}
                                onClick={onClick}
                                disabled={item.disabled || disabled}
                                key={index}
                            >
                                {item.content}
                            </Menu.Item>
                        );
                    }

                    if (href) {
                        return (
                            <Menu.Item
                                className={cls.Item}
                                as={AppLink}
                                to={href}
                                disabled={item.disabled || disabled}
                                theme={AppLinkThemes.SECONDARY}
                                key={index}
                            >
                                {item.content}
                            </Menu.Item>
                        );
                    }

                    return null;
                })}
            </Menu.Items>
        </Menu>
    );
};
