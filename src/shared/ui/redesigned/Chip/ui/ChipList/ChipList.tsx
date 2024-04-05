import { useCallback, useMemo } from 'react';

import { useSet } from '@/shared/hooks/useSet';
import { classNames } from '@/shared/lib/classNames/classNames';

import { FlexDirection } from '../../../Stack/Flex/model/types';
import { Flex } from '../../../Stack/Flex/ui/Flex';
import { ChipListOption } from '../../model/types/chip';
import { Chip } from '../Chip/Chip';

interface ChipListProps<T> {
    className?: string;
    options?: ChipListOption<T>[];
    onClick?: (selectedChips: ChipListOption<T>) => void;
    value?: ChipListOption<T>;
    direction?: FlexDirection;
}

function ChipList<T extends string>(props: ChipListProps<T>) {
    const { className, options, onClick, value, direction = 'Row' } = props;
    const selectedOptions = useSet<ChipListOption<T>>(value ? [value] : undefined);

    const onClickHandler = useCallback(
        (key: T) => {
            const chip = options?.find((prop) => prop.value === key);
            if (!chip) return;

            // if (multiselect) {
            //     if (selectedOptions.has(chip)) selectedOptions.delete(chip);
            //     else selectedOptions.add(chip);

            //     onClick?.(selectedOptions.entries);
            // } else {
            selectedOptions.clear();
            selectedOptions.add(chip);

            onClick?.(chip);
            // }
        },
        [onClick, options, selectedOptions],
    );

    const chips = useMemo(
        () =>
            options?.map((opt) => (
                <Chip key={opt.value} selected={selectedOptions.has(opt)} onClick={onClickHandler} {...opt} />
            )),
        [onClickHandler, options, selectedOptions],
    );

    const align = useMemo(() => (direction === 'Column' ? 'Start' : 'Center'), [direction]);

    return (
        <Flex
            align={align}
            className={classNames('', {}, [className])}
            direction={direction}
            gap="10"
            justify="Start"
        >
            {chips}
        </Flex>
    );
}

export { ChipList };
