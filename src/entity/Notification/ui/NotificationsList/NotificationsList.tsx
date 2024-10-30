import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { useFetchNotificationsQuery } from '../../api/notificationApi';
import { NotificationsItem } from '../NotificationsItem/NotificationsItem';
import { NotificationSkeleton } from '../NotificationSkeleton/NotificationSkeleton';

import cls from './NotificationsList.module.scss';

interface NotificationsListProps {
    className?: string;
    userId: string;
}

const NotificationsList = (props: NotificationsListProps) => {
    const { className, userId } = props;

    const { data: notifications = [], isLoading } = useFetchNotificationsQuery(userId, {
        pollingInterval: 10000,
    });

    if (isLoading) {
        return (
            <VStack gap="10" maxWidth>
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
            </VStack>
        );
    }

    // TODO: Если notifications.length === 0 => Уведомлений нет.

    return (
        <VStack className={classNames(cls.NotificationsListRedesigned, {}, [className])} gap="0" maxWidth>
            {notifications.map((n) => (
                <NotificationsItem className={cls.Item} key={n.id} notification={n} />
            ))}
        </VStack>
    );
};

const Memoized = memo(NotificationsList);

export { Memoized as NotificationsList };
