import { useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonVariant } from '../../../Button';

import cls from './Chip.module.scss';

export interface ChipProps<T> {
    className?: string;
    value: T;
    label: string;
    selected?: boolean;
    onClick?: (key: T) => void;
}

function Chip<T extends string>(props: ChipProps<T>) {
    const { className, selected = false, label, value: key, onClick } = props;
    const theme: ButtonVariant = selected ? 'primary' : 'transparent';

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
