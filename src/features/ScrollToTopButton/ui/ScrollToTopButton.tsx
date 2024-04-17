import { memo } from 'react';

import ArrowCircleIcon from '@/shared/assets/svg/arrow-circle.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';

import cls from './ScrollToTopButton.module.scss';

interface ScrollToTopButtonProps {
    className?: string;
}

const ScrollToTopButton = (props: ScrollToTopButtonProps) => {
    const { className } = props;

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className={classNames(cls.ScrollToTopButton, {}, [className])}
            type="button"
            onClick={scrollTop}
        >
            <Icon Svg={ArrowCircleIcon} />
        </button>
    );
};

const Memoized = memo(ScrollToTopButton);

export { Memoized as ScrollToTopButton };
