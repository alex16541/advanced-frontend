import { useCallback, useEffect, useState } from 'react';

interface UseModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    animationDeley?: number;
    lazy?: boolean;
}

export const useModal = ({
    isOpen,
    onClose,
    animationDeley = 300,
    lazy,
}: UseModalProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            setTimeout(() => {
                setIsClosing(false);
                onClose();
            }, animationDeley);
        }
    }, [animationDeley, onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeHandler();
            }
        },
        [closeHandler],
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

    return {
        closeHandler,
        isClosing,
        isMounted,
    };
};
