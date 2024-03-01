import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useFetchNotificationsQuery } from 'entity/Notification';
import { Skeleton } from 'shared/ui/Skeleton';
import { VStack } from 'shared/ui/Stack';
import { Card } from 'shared/ui/Card/Card';
import cls from './NotificationsList.module.scss';
import { NotificationsItem } from '../NotificationsItem/NotificationsItem';

interface NotificationsListProps {
    className?: string;
    userId: string;
}

const NotificationSkeleton = (
    <Card className={cls.Skeleton}>
        <VStack gap="10">
            <Skeleton width="100%" height="20px" />
            <VStack gap="6">
                <Skeleton width="100%" height="14px" />
                <Skeleton width="60%" height="14px" />
            </VStack>
        </VStack>
    </Card>
);

const NotificationsList = (props: NotificationsListProps) => {
    const { className, userId } = props;

    const { data: notifications = [], isLoading } = useFetchNotificationsQuery(userId, { pollingInterval: 10000 });

    if (isLoading) {
        return (
            <VStack max gap="10">
                {NotificationSkeleton}
                {NotificationSkeleton}
                {NotificationSkeleton}
                {NotificationSkeleton}

            </VStack>
        );
    }

    // TODO: Если notifications.length === 0 => Уведомлений нет.

    return (
        <VStack max gap="10" className={classNames(cls.NotificationsList, {}, [className])}>
            {notifications.map((n) => <NotificationsItem notification={n} />)}
        </VStack>
    );
};

const Memoized = memo(NotificationsList);

export { Memoized as NotificationsList };
