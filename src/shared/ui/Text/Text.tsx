import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextThemes {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
    START = 'align-start',
    CENTER = 'align-center',
    END = 'align-end',
}

export enum TextSize {
    S = 'size-s',
    M = 'size-m',
    L = 'size-l',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextThemes;
    align?: TextAlign;
    size?: TextSize;
}

export const Text = (props: TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextThemes.PRIMARY,
        align = TextAlign.START,
        size = TextSize.M,
        ...otherProps
    } = props;

    return (
        <div className={classNames(cls.Text, {}, [className, cls[theme], cls[align], cls[size]])}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
};
