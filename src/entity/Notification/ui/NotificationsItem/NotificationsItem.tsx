import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import { Notification } from '../../model/types/notification';

import cls from './NotificationsItem.module.scss';

interface NotificationsItemProps {
    className?: string;
    notification: Notification;
}

const NotificationsItem = (props: NotificationsItemProps) => {
    const { className, notification } = props;
    const content = (
        <Card className={classNames(cls.NotificationsItem, {}, [className])}>
            <Text
                text={notification.text}
                title={notification.title}
            />
        </Card>
    );

    if (notification.href) {
        return (
            <a className={cls.Link} href={notification.href}>
                {content}
            </a>
        );
    }

    return content;
};

const Memoized = memo(NotificationsItem);

export { Memoized as NotificationsItem };
