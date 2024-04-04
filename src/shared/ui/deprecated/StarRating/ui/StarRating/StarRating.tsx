import { memo, useCallback, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { FlexJustify } from '@/shared/ui/redesigned/Stack/Flex/model/types';

import { Button, ButtonThemes } from '../../../Button';
import { Star } from '../Star/Star';

import cls from './StarRating.module.scss';

interface StarRatingProps {
    className?: string;
    count?: number;
    rating?: number;
    onChange?: (value: number) => void;
    justify?: FlexJustify;
    editable?: boolean;
    disabled?: boolean;
    size?: number | string;
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
const StarRating = (props: StarRatingProps) => {
    const {
        className,
        count = 5,
        rating = 0,
        onChange,
        justify = 'Start',
        editable = false,
        disabled = false,
        size,
    } = props;
    const [value, setValue] = useState(rating);
    const [hovered, setHovered] = useState(0);

    const onChangeHandler = useCallback(
        (value: number) => {
            setValue(value);
            onChange?.(value);
        },
        [onChange],
    );

    const onMouseEnter = useCallback(
        (index: number) => {
            if (editable || (!editable && !value)) {
                setHovered(index);
            }
        },
        [editable, value],
    );

    const onMouseLeave = useCallback(() => {
        setHovered(0);
    }, []);

    return (
        <HStack
            className={classNames(cls.StarRating, {}, [className])}
            data-testid="StarRating"
            gap="0"
            justify={justify}
        >
            {Array(count)
                .fill('')
                .map((_, index) => {
                    const val = index + 1;

                    return (
                        <Button
                            className={cls.Button}
                            data-selected={val <= (hovered || value)}
                            data-testid={`StarRating.Star.${val}`}
                            disabled={disabled || (!editable && Boolean(value))}
                            key={val}
                            theme={ButtonThemes.CLEAR}
                            onClick={() => onChangeHandler(val)}
                            onMouseEnter={() => onMouseEnter(val)}
                            onMouseLeave={onMouseLeave}
                        >
                            <Star checked={val <= (hovered || value)} size={size} />
                        </Button>
                    );
                })}
        </HStack>
    );
};

const Memoized = memo(StarRating);

export { Memoized as StarRating };
