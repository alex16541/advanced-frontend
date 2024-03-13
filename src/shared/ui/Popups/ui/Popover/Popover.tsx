import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { PopupDirection } from '@/shared/types/ui';

import { directionClassName } from '../../styles/consts';
import clsPopup from '../../styles/popup.module.scss';

import cls from './Popover.module.scss';

interface PopoverProps {
    className?: string;
    button?: ReactNode;
    children?: ReactNode;
    disabled?: boolean;
    direction?: PopupDirection;
}

export const Popover = (props: PopoverProps) => {
    const {
        className,
        button = 'Open',
        children,
        disabled = false,
        direction = 'bottom right',
    } = props;

    const directionClass = directionClassName[direction];

    return (
        <HPopover className={classNames(cls.Popover, {}, [className, clsPopup.Popup])}>
            <HPopover.Button as="div" disabled={disabled} className={classNames(cls.Button, {}, [clsPopup.Button])}>
                {button}
            </HPopover.Button>

            <HPopover.Panel className={classNames(cls.Panel, {}, [clsPopup.Content, directionClass])}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
};
