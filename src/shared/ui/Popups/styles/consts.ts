import { PopupDirection } from 'shared/types/ui';
import clsPopup from './popup.module.scss';

export const directionClassName: Record<PopupDirection, string> = {
    'top right': clsPopup.topRight,
    'top left': clsPopup.topLeft,
    'bottom right': clsPopup.bottomRight,
    'bottom left': clsPopup.bottmLeft,
};
