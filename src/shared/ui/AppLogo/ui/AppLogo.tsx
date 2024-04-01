import { memo } from 'react';

import logo from '@/shared/assets/logo.png';
import { classNames } from '@/shared/lib/classNames/classNames';

import { AppImage } from '../../AppImage';
import { HStack } from '../../Stack';

import cls from './AppLogo.module.scss';

interface AppLogoProps {
    className?: string;
}

const AppLogo = (props: AppLogoProps) => {
    const { className } = props;

    if (!logo) return null;

    return (
        <HStack className={classNames(cls.AppLogo, {}, [className])} justify="Center" maxWidth>
            <AppImage className={cls.logo} src={logo} />
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
        </HStack>
    );
};

const Memoized = memo(AppLogo);

export { Memoized as AppLogo };
