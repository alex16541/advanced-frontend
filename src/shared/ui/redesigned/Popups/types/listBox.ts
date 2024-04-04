import { ReactNode } from 'react';

export interface ListBoxOption<T> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}
