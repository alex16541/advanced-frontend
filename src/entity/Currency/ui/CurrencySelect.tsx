import { useTranslation } from 'react-i18next';

import { ListBoxOption } from '@/shared/ui/deprecated/Popups/types/listBox';
import { ListBox } from '@/shared/ui/redesigned/Popups';

import { Currency } from '../model/consts/currency';
import '../i18n/i18n';

interface CurrencySelectProps {
    className?: string;
    label?: string;
    placeholder?: string;
    readonly?: boolean;
    value?: Currency;
    onChangeValue?: (value: Currency) => void;
}

export const CurrencySelect = (props: CurrencySelectProps) => {
    const { className, label, placeholder, readonly, value, onChangeValue } = props;
    const { t } = useTranslation('CurrencySelect');

    const onChangeHendler = (value: Currency) => {
        onChangeValue?.(value);
    };

    const currencyOptions: ListBoxOption<Currency, string>[] = [
        { value: Currency.RUB, content: t(Currency.RUB) },
        { value: Currency.EUR, content: t(Currency.EUR) },
        { value: Currency.USD, content: t(Currency.USD) },
    ];

    return (
        <ListBox
            className={className}
            defaultValue={placeholder}
            disabled={readonly}
            label={label}
            options={currencyOptions}
            value={value}
            onChange={onChangeHendler}
        />
    );
};
