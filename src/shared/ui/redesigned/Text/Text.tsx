import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Text.module.scss';

export type TextThemes = 'primary' | 'secondary' | 'accent' | 'error';

export type TextAlign = 'start' | 'center' | 'end';

export type TextSize = 's' | 'm' | 'l';

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextThemes;
    align?: TextAlign;
    size?: TextSize;
    HeaderTag?: HeaderTagType;
    dataTestId?: string;
}

export const Text = (props: TextProps) => {
    const {
        className,
        title,
        text,
        theme = 'primary',
        align = 'start',
        size = 'm',
        HeaderTag = 'h4',
        dataTestId = 'Text',
        ...otherProps
    } = props;

    return (
        <div
            className={classNames(cls.Text, {}, [className, cls[theme], cls[align], cls[size]])}
            data-testid={dataTestId}
        >
            {title && (
                <HeaderTag className={cls.title} data-testid={`${dataTestId}.Header`}>
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={cls.text} data-testid={`${dataTestId}.Text`}>
                    {text}
                </p>
            )}
        </div>
    );
};
