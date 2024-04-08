import { ButtonHTMLAttributes, forwardRef, memo, ReactElement, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Loader } from '../../../deprecated/Loader';
import { HStack } from '../../Stack';
import { FlexJustify } from '../../Stack/Flex/model/types';
import { ButtonColor, ButtonSize, ButtonVariant } from '../types';

import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonVariant;
    size?: ButtonSize;
    color?: ButtonColor;
    align?: FlexJustify;
    isLoading?: boolean;
    children?: ReactNode;
    addonLeft?: ReactElement;
    addonRight?: ReactElement;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        className,
        children,
        theme = 'primary',
        type,
        size = 'm',
        color = 'default',
        align = 'Center',
        isLoading,
        disabled,
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    const mods = {
        [cls.loading]: isLoading,
    };

    return (
        <button
            className={classNames(cls.Button, mods, [className, cls[theme], cls[size], cls[color]])}
            disabled={disabled || isLoading}
            ref={ref}
            type="button"
            {...otherProps}
        >
            <div className={cls.body}>
                <HStack justify={align}>
                    {addonLeft}
                    <div className={cls.content}>{children}</div>
                    {addonRight}
                </HStack>
                {isLoading && <Loader className={cls.loader} />}
            </div>
        </button>
    );
});

const Memoized = memo(Button);

export { Memoized as Button };
