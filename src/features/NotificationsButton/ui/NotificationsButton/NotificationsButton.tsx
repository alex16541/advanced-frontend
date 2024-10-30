import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { NotificationsList } from '@/entity/Notification';
import { getAuthData } from '@/entity/User';
import bell from '@/shared/assets/svg/bell.svg';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PopupDirection } from '@/shared/types/ui';
import { Drawer as DrawerDeprecated } from '@/shared/ui/redesigned/Drawer';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

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
        <div className={cls.NotificationsButtonWrapperRedesigned}>
            <BrowserView>
                <Popover
                    button={<Icon className={cls.Icon} Svg={bell} clickable onClick={() => {}} />}
                    className={classNames(cls.NotificationsButtonRedesigned, {}, [className])}
                    direction={direction}
                >
                    <NotificationsList userId={authData.id} />
                </Popover>
            </BrowserView>
            <MobileView>
                <Icon className={`${cls.Icon}`} Svg={bell} clickable onClick={onOpen} />
                <DrawerDeprecated isOpen={isOpen} onClose={onClose}>
                    <NotificationsList userId={authData.id} />
                </DrawerDeprecated>
            </MobileView>
        </div>
    );
};

const Memoized = memo(NotificationsButton);

export { Memoized as NotificationsButton };
