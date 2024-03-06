import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { useFetchNotificationsQuery } from '../../api/notificationApi';
import cls from './NotificationsList.module.scss';
import { NotificationsItem } from '../NotificationsItem/NotificationsItem';
import { NotificationSkeleton } from '../NotificationSkeleton/NotificationSkeleton';

interface NotificationsListProps {
    className?: string;
    userId: string;
}

const NotificationsList = (props: NotificationsListProps) => {
    const { className, userId } = props;

    const { data: notifications = [], isLoading } = useFetchNotificationsQuery(userId, { pollingInterval: 10000 });

    if (isLoading) {
        return (
            <VStack max gap="10">
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
            </VStack>
        );
    }

    // TODO: Если notifications.length === 0 => Уведомлений нет.

    return (
        <VStack max gap="10" className={classNames(cls.NotificationsList, {}, [className])}>
            {notifications.map((n) => <NotificationsItem key={n.id} notification={n} />)}
        </VStack>
    );
};

const Memoized = memo(NotificationsList);

export { Memoized as NotificationsList };
