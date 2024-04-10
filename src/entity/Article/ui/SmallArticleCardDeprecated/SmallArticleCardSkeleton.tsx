import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

import cls from './SmallArticleCard.module.scss';

interface SmallArticleCardProps {
    className?: string;
}

export const SmallArticleCardSkeleton = memo((props: SmallArticleCardProps) => {
    const { className } = props;

    return (
        <Card
            className={classNames(cls.skeleton, {}, [className, cls.skeleton])}
            data-testid="SmallArticleCard.Skeleton"
        >
            <Skeleton height="150px" width="100%" />

            <div className={cls.content}>
                <div className={cls.column}>
                    <Skeleton height="30px" width="100%" />
                    <Skeleton height="30px" width="70%" />
                </div>
                <Skeleton height="30px" width="100px" />
            </div>
        </Card>
    );
});
