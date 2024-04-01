import { memo, useCallback } from 'react';

import { changeUserJsonSettings } from '@/entity/User';
import PaintRoller from '@/shared/assets/svg/paint-roller.svg';
import { Theme } from '@/shared/consts/theme';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useTheme } from '@/shared/hooks/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonThemes } from '@/shared/ui/deprecated/Button';

import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

const ThemeSwitcher = (props: ThemeSwitcherProps) => {
    const { className, ...otherProps } = props;
    const { toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const changeTheme = useCallback(() => {
        toggleTheme((theme: Theme) => {
            dispatch(changeUserJsonSettings({ theme }));
        });
    }, [dispatch, toggleTheme]);

    return (
        <Button
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            theme={ButtonThemes.CLEAR}
            onClick={changeTheme}
            {...otherProps}
        >
            <PaintRoller />
        </Button>
    );
};

const Memoized = memo(ThemeSwitcher);

export { Memoized as ThemeSwitcher };
