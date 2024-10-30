import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleCreatePage.module.scss';

export const ArticleCreatePageSkeleton = () => (
    <VStack gap="20">
        <Card className={cls.HeaderCard}>
            <Skeleton height="22px" width="10%" />
        </Card>
        <Card className={cls.ContentCard}>
            <VStack gap="32">
                <VStack gap="12">
                    <Skeleton height="450px" width="100%" />
                    <Skeleton height="40px" width="100%" />
                </VStack>
                <VStack gap="8">
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="30%" />
                </VStack>
                <VStack gap="8">
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="30%" />
                </VStack>
                <VStack gap="8">
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="30%" />
                </VStack>
                <Skeleton height="400px" width="100%" />
                <VStack gap="8">
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="30%" />
                </VStack>
            </VStack>
        </Card>
    </VStack>
);
