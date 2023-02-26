import {
    ReactNode, useState, useEffect, useRef, useCallback,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    children: ReactNode;
}

const ANIMATION_DURATION = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen = false,
        // eslint-disable-next-line no-use-before-define
        onClose,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const mods = {
        [cls.isOpen]: isOpen,
        [cls.isClosing]: isClosing,
    };

    const closeHendler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DURATION);
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
                clearTimeout(timerRef.current);
                window.removeEventListener('keydown', onKeyDown);
            };
        },
        [timerRef, isOpen, onKeyDown],
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
