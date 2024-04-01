import { memo } from 'react';

import StarEmpty from '@/shared/assets/svg/star-empty.svg';
import StarFilled from '@/shared/assets/svg/star-filled.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Icon } from '../../../Icon/Icon';

import cls from './Star.module.scss';

interface StarProps {
    className?: string;
    checked?: boolean;
    size?: string | number;
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
const Star = (props: StarProps) => {
    const { className, checked = false, size = 32 } = props;

    return (
        <Icon
            className={classNames(cls.Star, {}, [className])}
            Svg={checked ? StarFilled : StarEmpty}
            width={size}
        />
    );
};

const Memoized = memo(Star);

export { Memoized as Star };
