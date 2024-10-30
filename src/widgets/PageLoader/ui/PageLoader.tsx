import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
    text?: string;
}

export const PageLoader = (props: PageLoaderProps) => {
    const { className, text } = props;
    const { t } = useTranslation();

    return (
        <Card className={classNames(cls.PageLoader, {}, [className])}>
            <VStack gap="20">
                <Skeleton height="38px" width="40%" />
                <VStack gap="16">
                    <Skeleton height="300px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="100%" />
                    <Skeleton height="24px" width="30%" />
                </VStack>
            </VStack>
        </Card>
    );
};
