import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './LargeArticleCard.module.scss';

interface LargeArticleCardProps {
    className?: string;
}

export const LargeArticleCardSkeleton = memo((props: LargeArticleCardProps) => {
    const { className } = props;

    return (
        <Card className={classNames(cls.skeleton, {}, [className])}>
            <Skeleton width="100%" height="250px" />
            <Skeleton width="70%" height="40px" className={cls.title} />
            <Skeleton width="100%" height="24px" />
            <Skeleton width="100%" height="24px" />
            <Skeleton width="100%" height="24px" />
            <Skeleton width="30%" height="24px" />
            <Skeleton width="200px" height="50px" className={cls.button} />
        </Card>
    );
});
