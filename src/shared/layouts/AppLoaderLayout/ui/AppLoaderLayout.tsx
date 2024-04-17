import { memo } from 'react';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { MainLayout } from '../../MainLayout';

import cls from './AppLoaderLayout.module.scss';

export const AppLoaderLayout = memo(() => (
    <MainLayout
        sidebar={<Skeleton border="32px" height="100%" width={220} />}
        content={
            <VStack className={cls.content} gap="16" style={{ height: '100%' }}>
                <Skeleton border="16px" height={32} width="70%" />
                <Skeleton border="16px" height={20} width="40%" />
                <Skeleton border="16px" height={20} width="50%" />
                <Skeleton border="16px" height={32} width="30%" />
                <Skeleton border="16px" height="40%" width="80%" />
                <Skeleton border="16px" height="40%" width="80%" />
            </VStack>
        }
        navbar={
            <HStack className={cls.header}>
                <Skeleton border="50%" height={40} width={40} />
            </HStack>
        }
    />
));
