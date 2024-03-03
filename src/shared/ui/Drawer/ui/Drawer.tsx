import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import { Overlay } from '../../Overlay';
import { Portal } from '../../Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer = (props: DrawerProps) => {
    const {
        className,
        children,
        isOpen = false,
        onClose,
    } = props;
    const mods = {
        [cls.isOpen]: isOpen,
    };

    return (
        <Portal>
            <div className={classNames(cls.Drawer, mods, [className, 'app_drawer'])}>
                <Overlay onClick={onClose} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
