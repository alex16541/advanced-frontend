import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { getAuthData } from '@/entity/User';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Popover } from '@/shared/ui/Popups/ui/Popover/Popover';
import { Button, ButtonThemes } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import bell from '@/shared/assets/svg/bell.svg';
import { PopupDirection } from '@/shared/types/ui';
import { NotificationsList } from '@/entity/Notification';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/Drawer';
import cls from './NotificationsButton.module.scss';

interface NotificationsButtonProps {
    className?: string;
    direction?: PopupDirection;
}

const NotificationsButton = (props: NotificationsButtonProps) => {
    const { className, direction } = props;

    const authData = useAppSelector(getAuthData);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    if (!authData) return null;

    return (
        <div>
            <BrowserView>
                <Popover
                    className={classNames(cls.NotificationsButton, {}, [className])}
                    direction={direction}
                    button={(
                        <Button
                            className={cls.Button}
                            theme={ButtonThemes.CLEAR}
                        >
                            <Icon
                                className={cls.Icon}
                                Svg={bell}
                            />
                        </Button>
                    )}
                >
                    <NotificationsList userId={authData.id} />
                </Popover>
            </BrowserView>
            <MobileView>
                <Button
                    className={cls.Button}
                    theme={ButtonThemes.CLEAR}
                    onClick={onOpen}
                >
                    <Icon
                        className={cls.Icon}
                        Svg={bell}
                    />
                </Button>
                <Drawer isOpen={isOpen} onClose={onClose}>
                    <NotificationsList userId={authData.id} />
                </Drawer>
            </MobileView>
        </div>
    );
};

const Memoized = memo(NotificationsButton);

export { Memoized as NotificationsButton };
