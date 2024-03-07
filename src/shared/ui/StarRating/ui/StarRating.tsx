import { memo, useCallback, useState } from 'react';
import cls from './StarRating.module.scss';
import { Button, ButtonThemes } from '../../Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import StarFilled from '@/shared/assets/svg/star-filled.svg';
import StarEmpty from '@/shared/assets/svg/star-empty.svg';
import { Icon } from '../../Icon/Icon';
import { HStack } from '../../Stack';
import { FlexJustify } from '../../Stack/Flex/model/types';

interface StarRatingProps {
    className?: string;
    count?: number;
    onChange?: (value: number) => void;
    justify?: FlexJustify;
    editable?: boolean;
    disabled?: boolean;
    size?: number | string;
}

const Star = ({ checked, size = 32 }: {checked?:boolean, size?: number | string}) => (
    <Icon className={cls.Star} Svg={checked ? StarFilled : StarEmpty} width={size} />
);

const StarRating = (props: StarRatingProps) => {
    const {
        className,
        count = 5,
        onChange,
        justify = 'Start',
        editable = false,
        disabled = false,
        size,
    } = props;
    const [value, setValue] = useState(0);
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
