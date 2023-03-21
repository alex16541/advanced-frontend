import { Select, SelectOption } from 'shared/ui/Select/Select';
import { FC, memo, useCallback } from 'react';
import { Currency } from '../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    label?: string;
    placeholder?: string;
    readonly?: boolean;
    value?: Currency;
    onChangeValue?: (value: Currency) => void;
}

const currencyOptions: SelectOption[] = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect: FC<CurrencySelectProps> = memo((props: CurrencySelectProps) => {
    const {
        className,
        label,
        placeholder,
        readonly,
        value,
        onChangeValue,
        ...otherProps
    } = props;

    const onChangeHendler = useCallback((value: string) => {
        onChangeValue?.(value as Currency);
    }, [onChangeValue]);

    return (
        <Select
            className={className}
            placeholder={placeholder}
            options={currencyOptions}
            readonly={readonly}
            label={label}
            value={value}
            onChangeValue={onChangeHendler}
            {...otherProps}
        />
    );
});
