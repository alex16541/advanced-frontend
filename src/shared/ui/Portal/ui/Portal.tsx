import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}

export const Portal = (props: PortalProps) => {
    const rootSelector = __PROJECT__ === 'frontend' ? 'root' : 'storybook-root';
    const {
        children,
        element = document.getElementById(rootSelector) || document.body,
    } = props;

    return createPortal(children, element);
};
