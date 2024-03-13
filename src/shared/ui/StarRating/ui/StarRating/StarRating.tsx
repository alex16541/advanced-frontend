import { memo, useCallback, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonThemes } from '../../../Button';
import { HStack } from '../../../Stack';
import { FlexJustify } from '../../../Stack/Flex/model/types';
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

    const onChangeHandler = useCallback((value: number) => {
        setValue(value);
        onChange?.(value);
    }, [onChange]);

    const onMouseEnter = useCallback((index: number) => {
        if (editable || (!editable && !value)) {
            setHovered(index);
        }
    }, [editable, value]);

    const onMouseLeave = useCallback(() => {
        setHovered(0);
    }, []);

    return (
        <HStack gap="0" justify={justify} className={classNames(cls.StarRating, {}, [className])}>
            {Array(count).fill('').map((_, index) => {
                const val = index + 1;

                return (
                    <Button
                        className={cls.Button}
                        key={val}
                        theme={ButtonThemes.CLEAR}
                        onClick={() => onChangeHandler(val)}
                        onMouseEnter={() => onMouseEnter(val)}
                        onMouseLeave={onMouseLeave}
                        disabled={disabled || (!editable && Boolean(value))}
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
