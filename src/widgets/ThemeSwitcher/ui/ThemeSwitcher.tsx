import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import LightIcon from 'shared/assets/svg/sun.svg';
import DurkIcon from 'shared/assets/svg/moon.svg';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { FC, memo } from 'react';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo((props: ThemeSwitcherProps) => {
    const { className, ...otherProps } = props;
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonThemes.CLEAR}
            onClick={toggleTheme}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            {...otherProps}
        >
            {theme === Theme.LIGHT ? <LightIcon /> : <DurkIcon />}
        </Button>
    );
});
