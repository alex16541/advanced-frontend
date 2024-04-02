import { memo, useCallback } from 'react';

import { changeUserJsonSettings } from '@/entity/User';
import PaintRoller from '@/shared/assets/svg/paint-roller.svg';
import { Theme } from '@/shared/consts/theme';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useTheme } from '@/shared/hooks/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/FeatureToggle/FeatureToggle';
import { Button as ButtonRedesigned, ButtonThemes } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';

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
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <ButtonRedesigned
                    className={classNames(cls.ThemeSwitcher, {}, [className])}
                    theme={ButtonThemes.CLEAR}
                    onClick={changeTheme}
                    {...otherProps}
                >
                    <PaintRoller />
                </ButtonRedesigned>
            }
            on={
                <Button
                    className={classNames(cls.ThemeSwitcherRedesigned, {}, [className])}
                    theme="clear"
                    onClick={changeTheme}
                    {...otherProps}
                >
                    <PaintRoller />
                </Button>
            }
        />
    );
};

const Memoized = memo(ThemeSwitcher);

export { Memoized as ThemeSwitcher };
