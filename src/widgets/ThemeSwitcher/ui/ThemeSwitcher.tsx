import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/themeProvider';
import LightIcon from 'shared/assets/svg/sun.svg';
import DurkIcon from 'shared/assets/svg/moon.svg';
import { Button, ButtonThemes } from 'shared/ui/Button';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
    const { className, ...otherProps } = props;
    // const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonThemes.CLEAR}
            // onClick={toggleTheme}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            {...otherProps}
        >
            <LightIcon />
            {/* {theme === Theme.LIGHT ? <LightIcon /> : <DurkIcon />} */}
        </Button>
    );
};
