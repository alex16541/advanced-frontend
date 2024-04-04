import { Menu } from '@headlessui/react';
import { ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { PopupDirection } from '@/shared/types/ui';

import { AppLink } from '../../../AppLink';
import { Button } from '../../../Button';
import { directionClassName } from '../../styles/consts';
import clsPopup from '../../styles/popup.module.scss';
import { DropdownItem } from '../../types/dropdown';

import cls from './Dropdown.module.scss';

interface DropdownProps {
    className?: string;
    button: ReactNode;
    items?: DropdownItem[];
    disabled?: boolean;
    direction?: PopupDirection;
}

export const Dropdown = (props: DropdownProps) => {
    const { className, button, items = [], disabled = false, direction = 'bottom right' } = props;

    const directionClass = directionClassName[direction];

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [clsPopup.Popup, className])}>
            <Menu.Button className={classNames(cls.Button, {}, [clsPopup.Button])} disabled={disabled}>
                {button}
            </Menu.Button>
            <Menu.Items as="div" className={classNames(cls.Items, {}, [clsPopup.Content, directionClass])}>
                {items.map((item, index) => {
                    const { content = 'Menu item', onClick, href, isDelimiter } = item;

                    if (isDelimiter) {
                        return <Menu.Item as="div" className={cls.delimiter} key={index} />;
                    }

                    if (onClick) {
                        return (
                            <Menu.Item
                                align="start"
                                as={Button}
                                className={cls.Item}
                                disabled={item.disabled || disabled}
                                key={index}
                                theme="clear"
                                onClick={onClick}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    if (href) {
                        return (
                            <Menu.Item
                                as={AppLink}
                                className={cls.Item}
                                disabled={item.disabled || disabled}
                                key={index}
                                to={href}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    return null;
                })}
            </Menu.Items>
        </Menu>
    );
};
