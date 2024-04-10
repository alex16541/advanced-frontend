import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

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
            <Skeleton border="0" height="150px" width="100%" />

            <VStack className={cls.content} gap="2" justify="SpaceBetween">
                <VStack gap="4">
                    <HStack gap="8">
                        <Skeleton height="32px" width="32px" />
                        <Skeleton height="22px" width="40px" />
                    </HStack>
                    <Skeleton height="28px" width="90%" />
                </VStack>

                <HStack justify="SpaceBetween">
                    <Skeleton height="22px" width="100px" />
                    <Skeleton height="22px" width="60px" />
                </HStack>
            </VStack>
        </Card>
    );
});
