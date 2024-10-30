import { ReactNode } from 'react';

export interface ListBoxOption<T, V extends ReactNode = ReactNode> {
    value: T;
    content: V;
    disabled?: boolean;
}
