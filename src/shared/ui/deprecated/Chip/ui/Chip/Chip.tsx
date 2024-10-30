import { useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonThemes } from '../../../Button';

import cls from './Chip.module.scss';

export interface ChipProps<T, V = string> {
    className?: string;
    value: T;
    label: V;
    selected?: boolean;
    onClick?: (key: T) => void;
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
function Chip<T extends string, V extends string = string>(props: ChipProps<T, V>) {
    const { className, selected = false, label, value: key, onClick } = props;
    const theme = selected ? ButtonThemes.PRIMARY : ButtonThemes.OUTLINED;

    const onClickHandler = useCallback(() => {
        onClick?.(key);
    }, [onClick, key]);

    return (
        <Button className={classNames(cls.Chip, {}, [className])} theme={theme} onClick={onClickHandler}>
            {label}
        </Button>
    );
}

export { Chip };
