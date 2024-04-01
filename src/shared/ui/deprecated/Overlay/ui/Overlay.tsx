import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
const Overlay = (props: OverlayProps) => {
    const { className, onClick } = props;

    const handleClose = useCallback(() => {
        onClick?.();
    }, [onClick]);

    return <div className={classNames(cls.Overlay, {}, [className])} onClick={handleClose} />;
};

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
const Memoized = memo(Overlay);

export { Memoized as Overlay };
