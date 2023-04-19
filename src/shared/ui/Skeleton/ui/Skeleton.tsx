import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo } from 'react';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    width: string | number;
    height: string | number;
    border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className, width, height, border = '5px',
    } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return <div style={styles} className={classNames(cls.Skeleton, {}, [className])} />;
});
