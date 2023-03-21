import { Select, SelectOption } from 'shared/ui/Select/Select';
import { FC, memo, useCallback } from 'react';
import { Country } from '../model/types/country';

interface CountrySelectProps {
    className?: string;
    label?: string;
    placeholder?: string;
    readonly?: boolean;
    value?: Country;
    onChangeValue?: (value: Country) => void;
}

const countryOptions: SelectOption[] = [
    { value: Country.Franc, content: Country.Franc },
    { value: Country.Italy, content: Country.Italy },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.USA, content: Country.USA },
    { value: Country.Japan, content: Country.Japan },
];

export const CountrySelect: FC<CountrySelectProps> = memo((props: CountrySelectProps) => {
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
        onChangeValue?.(value as Country);
    }, [onChangeValue]);

    return (
        <Select
            className={className}
            placeholder={placeholder}
            options={countryOptions}
            readonly={readonly}
            label={label}
            value={value}
            onChangeValue={onChangeHendler}
            {...otherProps}
        />
    );
});
