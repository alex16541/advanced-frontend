import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
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
                <Skeleton height="20px" width="100%" />
                <VStack gap="6">
                    <Skeleton height="14px" width="100%" />
                    <Skeleton height="14px" width="60%" />
                </VStack>
            </VStack>
        </Card>
    );
};

const Memoized = memo(NotificationSkeleton);

export { Memoized as NotificationSkeleton };
