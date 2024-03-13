import { memo } from 'react';

import PaintRoller from '@/shared/assets/svg/paint-roller.svg';
import { useTheme } from '@/shared/hooks/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonThemes } from '@/shared/ui/Button';

import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

const ThemeSwitcher = (props: ThemeSwitcherProps) => {
    const { className, ...otherProps } = props;
    const { toggleTheme } = useTheme();

    return (
        <Button
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            theme={ButtonThemes.CLEAR}
            onClick={toggleTheme}
            {...otherProps}
        >
            <PaintRoller />
        </Button>
    );
};

const Memoized = memo(ThemeSwitcher);

export { Memoized as ThemeSwitcher };
