import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, memo } from 'react';
import { Menu } from '@headlessui/react';
import { PopupDirection } from 'shared/types/ui';
import cls from './Dropdown.module.scss';
import { Button } from '../Button';
import { AppLink, AppLinkThemes } from '../AppLink/AppLink';

const directionClassName: Record<PopupDirection, string> = {
    'top right': cls.topRight,
    'top left': cls.topLeft,
    'bottom right': cls.bottomRight,
    'bottom left': cls.bottmLeft,
};

export interface DropdownItem {
    content: ReactNode;
    onClick?: () => void;
    href?: string;
    disabled?: boolean
}

interface DropdownProps {
    className?: string;
    target: ReactNode;
    items?: DropdownItem[]
    disabled?: boolean;
    direction?: PopupDirection;
}

export const Dropdown = (props: DropdownProps) => {
    const {
        className,
        target,
        items = [],
        disabled = false,
        direction = 'bottom right',
    } = props;

    const directionClass = directionClassName[direction];

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.Target} disabled={disabled}>{target}</Menu.Button>
            <Menu.Items as="div" className={classNames(cls.Items, {}, [directionClass])}>
                {items.map((item) => {
                    const { onClick, href } = item;

                    // TODO: Добавить divider

                    if (onClick) {
                        return (
                            <Menu.Item
                                className={cls.Item}
                                as={Button}
                                onClick={onClick}
                                disabled={item.disabled || disabled}
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
