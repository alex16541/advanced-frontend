import { useCallback, useEffect, useState } from 'react';

interface UseModalProps {
    isOpen?: boolean;
    close?: () => void;
    onClose?: () => void;
    animationDeley?: number;
}

export const useModal = ({ isOpen, close, onClose, animationDeley = 300 }: UseModalProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            close?.();
            setTimeout(() => {
                setIsClosing(false);
                onClose();
            }, animationDeley);
        }
    }, [animationDeley, onClose, close]);

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
