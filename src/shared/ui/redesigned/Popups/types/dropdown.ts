import { ReactNode } from 'react';

export interface DropdownItem {
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
    isDelimiter?: boolean;
}
