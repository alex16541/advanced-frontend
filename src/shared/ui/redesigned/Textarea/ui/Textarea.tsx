import {
    FormEventHandler,
    HTMLAttributes,
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
} from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import debounce from '@/shared/lib/debounce';

import cls from './Textarea.module.scss';

type TextareaBaseProps = Omit<HTMLAttributes<HTMLTextAreaElement>, 'onInput'>;
interface TextareaProps extends TextareaBaseProps {
    className?: string;
    onInput?: FormEventHandler<HTMLTextAreaElement>;
    maxLength?: number;
    placeholder?: string;
    disabled?: boolean;
}

const Textarea = (props: TextareaProps) => {
    const { className, onInput, maxLength, placeholder, disabled, ...otherProps } = props;
    const ref = useRef<HTMLTextAreaElement>(null);

    const onInputHandler = useCallback<FormEventHandler<HTMLTextAreaElement>>(
        (e) => {
            const target = e.target as HTMLTextAreaElement;

            target.value = target.value.replaceAll('\n', '');

            target.style.height = '1px';
            target.style.height = `${target.scrollHeight}px`;

            onInput?.(e);
        },
        [onInput],
    );

    const resizeTextarea = useCallback(() => {
        if (typeof ref === 'object' && ref?.current) {
            ref.current.style.height = '1px';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    }, [ref]);

    useEffect(() => {
        resizeTextarea();
    }, [resizeTextarea]);

    useLayoutEffect(() => {
        const resizeTextareaDebounced = debounce(resizeTextarea);

        window.addEventListener('resize', () => {
            resizeTextareaDebounced();
        });

        return () => {
            window.removeEventListener('resize', () => {});
            resizeTextareaDebounced.clear();
        };
    }, [resizeTextarea]);

    return (
        <textarea
            className={classNames(cls.Textarea, {}, [className])}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder}
            ref={ref}
            onInput={onInputHandler}
            {...otherProps}
        />
    );
};

const Memoized = memo(Textarea);

export { Memoized as Textarea };
