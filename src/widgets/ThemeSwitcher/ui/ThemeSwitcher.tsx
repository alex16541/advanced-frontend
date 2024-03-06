import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import PaintRoller from '@/shared/assets/svg/paint-roller.svg';
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
            theme={ButtonThemes.CLEAR}
            onClick={toggleTheme}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            {...otherProps}
        >
            <PaintRoller />
        </Button>
    );
};

const Memoized = memo(ThemeSwitcher);

export { Memoized as ThemeSwitcher };
