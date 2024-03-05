import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Card } from '@/shared/ui/Card/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import cls from './NotificationSkeleton.module.scss';

interface NotificationSkeletonProps {
    className?: string;
}

const NotificationSkeleton = (props: NotificationSkeletonProps) => {
    const { className } = props;

    return (
        <Card className={classNames(cls.NotificationSkeleton, {}, [className])}>
            <VStack gap="10">
                <Skeleton width="100%" height="20px" />
                <VStack gap="6">
                    <Skeleton width="100%" height="14px" />
                    <Skeleton width="60%" height="14px" />
                </VStack>
            </VStack>
        </Card>
    );
};

const Memoized = memo(NotificationSkeleton);

export { Memoized as NotificationSkeleton };
