import {
    ReactNode, useEffect, useCallback,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    children: ReactNode;
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen = false,
        // eslint-disable-next-line no-use-before-define
        onClose,
    } = props;

    const mods = {
        [cls.isOpen]: isOpen,
    };

    const closeHendler = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHendler();
        }
    }, [closeHendler]);

    useEffect(
        () => {
            if (isOpen) {
                window.addEventListener('keydown', onKeyDown);
            }
            return () => {
                window.removeEventListener('keydown', onKeyDown);
            };
        },
        [isOpen, onKeyDown],
    );

    function onContentClick(e: React.MouseEvent) {
        e.stopPropagation();
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.backdrop} onClick={closeHendler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
