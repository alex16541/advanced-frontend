import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { getAuthData } from 'entity/User';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { Popover } from 'shared/ui/Popups/ui/Popover/Popover';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import bell from 'shared/assets/svg/bell.svg';
import { PopupDirection } from 'shared/types/ui';
import { NotificationsList } from '../NotificationsList/NotificationsList';
import cls from './NotificationsButton.module.scss';

interface NotificationsButtonProps {
    className?: string;
    direction?: PopupDirection;
}

const NotificationsButton = (props: NotificationsButtonProps) => {
    const { className, direction } = props;

    const authData = useAppSelector(getAuthData);

    if (!authData) return null;

    return (
        <div>
            <Popover
                className={classNames(cls.NotificationsButton, {}, [className])}
                direction={direction}
                button={(
                    <Button
                        className={cls.Button}
                        theme={ButtonThemes.CLEAR}
                    >
                        <Icon Svg={bell} className={cls.Icon} />
                    </Button>
                )}
            >
                <NotificationsList userId={authData.id} />
            </Popover>
        </div>
    );
};

const Memoized = memo(NotificationsButton);

export { Memoized as NotificationsButton };
