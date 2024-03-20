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
        <Card
            className={classNames(cls.skeleton, {}, [className])}
            data-testid="largeArticleCard.Skeleton"
        >
            <Skeleton height="350px" width="100%" />
            <Skeleton className={cls.title} height="40px" width="70%" />
            <Skeleton height="24px" width="100%" />
            <Skeleton height="24px" width="100%" />
            <Skeleton height="24px" width="100%" />
            <Skeleton height="24px" width="30%" />
            <Skeleton className={cls.button} height="50px" width="200px" />
        </Card>
    );
});
