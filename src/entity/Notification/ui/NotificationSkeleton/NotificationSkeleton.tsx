import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './NotificationSkeleton.module.scss';

interface NotificationSkeletonProps {
    className?: string;
}

const NotificationSkeleton = (props: NotificationSkeletonProps) => {
    const { className } = props;

    const Card = CardRedesigned;
    const Skeleton = SkeletonRedesigned;

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
