import { memo, useCallback } from 'react';
import { ListBoxOption, ListBox } from 'shared/ui/ListBox/ListBox';
import { Currency } from '../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    label?: string;
    placeholder?: string;
    readonly?: boolean;
    value?: Currency;
    onChangeValue?: (value: Currency) => void;
}

const currencyOptions: ListBoxOption<Currency>[] = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

const CurrencySelect = (props: CurrencySelectProps) => {
    const {
        className,
        label,
        placeholder,
        readonly,
        value,
        onChangeValue,
    } = props;

    const onChangeHendler = useCallback(
        (value: Currency) => {
            onChangeValue?.(value);
        },
        [onChangeValue],
    );

    return (
        <ListBox
            className={className}
            defaultValue={placeholder}
            options={currencyOptions}
            disabled={readonly}
            label={label}
            value={value}
            onChange={onChangeHendler}
        />

    );
};

const Memoized = memo(CurrencySelect);

export { Memoized as CurrencySelect };
