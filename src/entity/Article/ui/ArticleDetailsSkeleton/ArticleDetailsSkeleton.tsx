import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleDetailsSkeleton.module.scss';

interface ArticleDetailsSkeletonProps {
    className?: string;
}

const ArticleDetailsSkeleton = (props: ArticleDetailsSkeletonProps) => {
    const { className } = props;

    return (
        <Card className={classNames(cls.ArticleDetailsSkeleton, {}, [className])}>
            <VStack data-testid="ArticleDetails.Skeleton" gap="16">
                <VStack gap="8">
                    <HStack gap="8">
                        <Skeleton height="32px" width="32px" />
                        <Skeleton height="22px" width="40px" />
                        <Skeleton height="22px" width="60px" />
                    </HStack>
                    <Skeleton height="36px" width="80%" />
                </VStack>
                <Skeleton height="32px" width="40%" />
                <Skeleton height="350px" width="100%" />
                <VStack gap="8">
                    <Skeleton height="32px" width="70%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="30%" />
                </VStack>
                <VStack gap="8">
                    <Skeleton height="32px" width="50%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="30%" />
                </VStack>
                <VStack gap="8">
                    <Skeleton height="32px" width="30%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="30%" />
                </VStack>
                <VStack gap="8">
                    <Skeleton height="32px" width="45%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="30%" />
                </VStack>
                <Skeleton height="350px" width="100%" />
                <VStack gap="8">
                    <Skeleton height="32px" width="15%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="30%" />
                </VStack>
            </VStack>
        </Card>
    );
};

const Memoized = memo(ArticleDetailsSkeleton);

export { Memoized as ArticleDetailsSkeleton };
