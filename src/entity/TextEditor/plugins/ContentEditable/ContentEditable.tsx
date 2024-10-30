import './ContentEditable.scss';

import { ContentEditable } from '@lexical/react/LexicalContentEditable';

type Props = {
    className?: string;
    placeholderClassName?: string;
    placeholder: string;
};

export default function LexicalContentEditable({
    className,
    placeholder,
    placeholderClassName,
}: Props): JSX.Element {
    return (
        <ContentEditable
            aria-placeholder={placeholder}
            className={className ?? 'ContentEditable__root'}
            placeholder={
                <div className={placeholderClassName ?? 'ContentEditable__placeholder'}>{placeholder}</div>
            }
        />
    );
}
