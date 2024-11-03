import { useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { FlexDirection, FlexJustify } from '../../../Stack/Flex/model/types';
import { Flex } from '../../../Stack/Flex/ui/Flex';
import { ChipListOption } from '../../model/types/chip';
import { Chip } from '../Chip/Chip';

interface ChipListProps<T, V> {
    className?: string;
    options?: ChipListOption<T, V>[];
    onClick?: (selectedChips: ChipListOption<T, V>) => void;
    onChange?: (selectedChips: ChipListOption<T, V>[]) => void;
    value?: ChipListOption<T, V> | ChipListOption<T, V>[];
    justify?: FlexJustify;
    direction?: FlexDirection;
    multiselect?: boolean;
    tLabel?: (label: string) => string;
}

function ChipList<T extends string, V extends string = string>(props: ChipListProps<T, V>) {
    const {
        className,
        options,
        onClick,
        value = [],
        direction = 'Row',
        justify = 'Start',
        onChange,
        multiselect,
        tLabel,
    } = props;

    const onChangeHandler = (chip: ChipListOption<T, V>) => {
        if (multiselect && Array.isArray(value)) {
            const set = new Set<ChipListOption<T, V>>(value);
            if (set.has(chip)) set.delete(chip);
            else set.add(chip);

            const selected = Array.from(set);
            onChange?.(selected);
        } else {
            onChange?.([chip]);
        }
    };

    const onClickHandler = (key: T) => {
        const chip = options?.find((prop) => prop.value === key);
        if (!chip) return;

        onClick?.(chip);
        onChangeHandler(chip);
    };

    const chips = options?.map((opt) => (
        <Chip
            key={opt.value}
            selected={
                Array.isArray(value) ? !!value.find((v) => v.value === opt.value) : value.value === opt.value
            }
            onClick={onClickHandler}
            {...opt}
            label={tLabel ? tLabel(opt.label) : opt.label}
        />
    ));

    const align = useMemo(() => (direction === 'Column' ? 'Start' : 'Center'), [direction]);

    return (
        <Flex
            align={align}
            className={classNames('', {}, [className])}
            direction={direction}
            gap="8"
            justify={justify}
        >
            {chips}
        </Flex>
    );
}

export { ChipList };
