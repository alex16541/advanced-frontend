import {
    ReactNode, useEffect, useCallback, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Overlay } from '../../../ui/Overlay';
import { Portal } from '../../../ui/Portal';
import cls from './Modal.module.scss';

const ANIMATION_DURATION = 200;

interface ModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    children: ReactNode;
}

export const Modal = (props: ModalProps) => {
    const [isMounted, setIsMounted] = useState(false);

    const {
        className,
        children,
        isOpen = false,
        onClose,
    } = props;

    const mods = {
        [cls.showModal]: isMounted && isOpen,
    };

    const closeHendler = useCallback(() => {
        if (onClose) {
            setIsMounted(false);
            setTimeout(onClose, ANIMATION_DURATION);
        }
    }, [onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeHendler();
            }
        },
        [closeHendler],
    );

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    function onContentClick(e: React.MouseEvent) {
        e.stopPropagation();
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <Overlay onClick={closeHendler} />
                <div className={cls.content} onClick={onContentClick}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
