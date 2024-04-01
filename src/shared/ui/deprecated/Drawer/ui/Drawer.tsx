import { ReactNode, useCallback, useEffect } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { AnimationProvider, useAnimationLibs } from '@/shared/lib/components/AnimationProvider';

import { Portal } from '../../Portal';

import cls from './Drawer.module.scss';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
const DrawerComponent = (props: DrawerProps) => {
    const { className, children, isOpen = false, onClose, lazy = false } = props;

    const height = window.innerHeight;
    const { Spring, Gesture } = useAnimationLibs();
    const { useSpring, a } = Spring;
    const { useDrag } = Gesture;

    const [{ y }, api] = useSpring(() => ({ y: height }));

    const open = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    const close = useCallback(
        (velocity = 0) => {
            api.start({
                y: height,
                immediate: false,
                onResolve: onClose,
            });
        },
        [api, onClose, height],
    );

    useEffect(() => {
        if (isOpen) {
            open();
        } else {
            close();
        }
    }, [close, isOpen, open]);

    const bind = useDrag(
        ({ last, velocity: [, vy], direction: [, dy], offset: [, oy], cancel, canceled }) => {
            if (oy < -70) cancel();

            if (last) {
                if (oy > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close(vy);
                } else {
                    open();
                }
            } else api.start({ y: oy, immediate: true });
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            rubberband: true,
        },
    );

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    const overlayStyle = {
        display,
        opacity: y.to([0, height], [1, 0]),
    };

    if (!isOpen) return null;

    return (
        <Portal>
            <div className={classNames(cls.Drawer, {}, [className])}>
                {/* <Overlay onClick={closeHandler} /> */}
                <a.div className={cls.overlay} style={overlayStyle} onClick={() => close()} />
                <a.div
                    className={cls.content}
                    style={{ display, bottom: `calc(-100vh + ${height}px)`, y }}
                    {...bind()}
                >
                    {children}
                </a.div>
            </div>
        </Portal>
    );
};

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
const DrawerWithAnimationLibs = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();
    if (!isLoaded) return null;

    return <DrawerComponent {...props} />;
};

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export const Drawer = (props: DrawerProps) => (
    <AnimationProvider>
        <DrawerWithAnimationLibs {...props} />
    </AnimationProvider>
);
