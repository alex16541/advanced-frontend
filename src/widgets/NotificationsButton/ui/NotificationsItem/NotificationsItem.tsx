import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Notification } from 'entity/Notification';
import { Text } from 'shared/ui/Text/Text';
import { Card } from 'shared/ui/Card/Card';
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
                title={notification.title}
                text={notification.text}
            />
        </Card>
    );

    if (notification.href) {
        return (
            <a href={notification.href} className={cls.Link}>
                {content}
            </a>
        );
    }

    return content;
};

const Memoized = memo(NotificationsItem);

export { Memoized as NotificationsItem };
