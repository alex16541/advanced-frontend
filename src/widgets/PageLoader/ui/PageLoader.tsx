import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Text } from '@/shared/ui/deprecated/Text';
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
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <div className={classNames(cls.PageLoaderDeprecated, {}, [className])}>
                    <Loader />
                    <Text text={text || t('page loader text')} />
                </div>
            }
            on={
                <Card className={classNames(cls.PageLoader, {}, [className])}>
                    <VStack gap="20">
                        <Skeleton height="38px" width="40%" />
                        <VStack gap="16">
                            <Skeleton height="24px" width="100%" />
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
            }
        />
    );
};
