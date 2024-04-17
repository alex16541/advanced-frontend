import { memo } from 'react';

import { ScrollToTopButton } from '@/features/ScrollToTopButton';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
    className?: string;
}

const ScrollToolbar = (props: ScrollToolbarProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.ScrollToolbar, {}, [className])}>
            <ScrollToTopButton />
        </div>
    );
};

const Memoized = memo(ScrollToolbar);

export { Memoized as ScrollToolbar };
