import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Text.module.scss';

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export enum TextThemes {
    PRIMARY = 'primary',
    CONTRAST = 'contrast',
    ERROR = 'error',
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export enum TextAlign {
    START = 'align-start',
    CENTER = 'align-center',
    END = 'align-end',
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export enum TextSize {
    S = 'size-s',
    M = 'size-m',
    L = 'size-l',
}

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
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

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export const Text = (props: TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextThemes.PRIMARY,
        align = TextAlign.START,
        size = TextSize.M,
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
