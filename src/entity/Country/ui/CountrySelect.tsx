import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/Popups/ui/ListBox/ListBox';
import { ListBoxOption } from 'shared/ui/Popups/types/listBox';
import { Country } from '../model/consts/country';

interface CountrySelectProps {
    className?: string;
    label?: string;
    placeholder?: string;
    readonly?: boolean;
    value?: Country;
    onChangeValue?: (value: Country) => void;
}

const countryOptions: ListBoxOption<Country>[] = [
    { value: Country.Franc, content: Country.Franc },
    { value: Country.Italy, content: Country.Italy },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.USA, content: Country.USA },
    { value: Country.Japan, content: Country.Japan },
];

const CountrySelect = (props: CountrySelectProps) => {
    const {
        className,
        label,
        placeholder,
        readonly,
        value,
        onChangeValue,
    } = props;

    const onChangeHendler = useCallback(
        (value: string) => {
            onChangeValue?.(value as Country);
        },
        [onChangeValue],
    );

    return (
        <ListBox
            className={className}
            defaultValue={placeholder}
            options={countryOptions}
            disabled={readonly}
            label={label}
            value={value}
            onChange={onChangeHendler}
        />
    );
};

const Memoized = memo(CountrySelect);

export { Memoized as CountrySelect };
