import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, lazy } from 'react';
import { useModal } from 'shared/hooks/useModal';
import { Overlay } from '../../Overlay';
import { Portal } from '../../Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

export const Drawer = (props: DrawerProps) => {
    const {
        className,
        children,
        isOpen = false,
        onClose,
        lazy = false,
    } = props;

    const { closeHandler, isMounted, isClosing } = useModal({
        isOpen,
        onClose,
        animationDeley: 200,
        lazy,
    });

    const mods = {
        [cls.isOpen]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) return null;

    return (
        <Portal>
            <div className={classNames(cls.Drawer, mods, [className])}>
                <Overlay onClick={closeHandler} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
