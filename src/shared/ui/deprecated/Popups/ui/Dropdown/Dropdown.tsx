import { Menu } from '@headlessui/react';
import { ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { PopupDirection } from '@/shared/types/ui';

import { AppLink, AppLinkThemes } from '../../../AppLink/AppLink';
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

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
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
                    const { onClick, href } = item;

                    // TODO: Добавить divider

                    if (onClick) {
                        return (
                            <Menu.Item
                                as={Button}
                                className={cls.Item}
                                disabled={item.disabled || disabled}
                                key={index}
                                onClick={onClick}
                            >
                                {item.content}
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
                                theme={AppLinkThemes.SECONDARY}
                                to={href}
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
