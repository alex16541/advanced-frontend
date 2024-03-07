import {
    ReactNode,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/hooks/useModal';
import { Overlay } from '../../../ui/Overlay';
import { Portal } from '../../../ui/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    classNameContent?: string;
    isOpen?: boolean;
    onClose?: () => void;
    children: ReactNode;
    lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        classNameContent,
        children,
        isOpen = false,
        onClose,
        lazy,
    } = props;

    const { closeHandler, isMounted, isClosing } = useModal({
        isOpen,
        onClose,
        animationDeley: 200,
    });

    const mods = {
        [cls.isOpen]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) return null;

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <Overlay onClick={closeHandler} />
                <div className={classNames(cls.content, {}, [classNameContent])}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
