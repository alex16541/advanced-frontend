import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Star.module.scss';
import { Icon } from '../../../Icon/Icon';
import StarFilled from '@/shared/assets/svg/star-filled.svg';
import StarEmpty from '@/shared/assets/svg/star-empty.svg';

interface StarProps {
    className?: string;
    checked?: boolean;
    size?: string | number;
}

const Star = (props: StarProps) => {
    const {
        className,
        checked = false,
        size = 32,
    } = props;

    return (
        <Icon className={classNames(cls.Star, {}, [className])} Svg={checked ? StarFilled : StarEmpty} width={size} />
    );
};

const Memoized = memo(Star);

export { Memoized as Star };
