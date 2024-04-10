import { memo } from 'react';

import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const LargeArticleCardSkeleton = memo(() => (
    <Card data-testid="largeArticleCard.Skeleton" maxWidth>
        <VStack gap="16">
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
                <Skeleton height="24px" width="100%" />
                <Skeleton height="24px" width="100%" />
                <Skeleton height="24px" width="30%" />
            </VStack>
            <HStack justify="SpaceBetween">
                <Skeleton height="32px" width="160px" />
                <Skeleton height="22px" width="100px" />
            </HStack>
        </VStack>
    </Card>
));
