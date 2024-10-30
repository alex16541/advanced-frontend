import { useTranslation } from 'react-i18next';

import { ListBoxOption } from '@/shared/ui/deprecated/Popups/types/listBox';
import { ListBox } from '@/shared/ui/redesigned/Popups';

import { Country } from '../model/consts/country';
import '../i18n/i18n';

interface CountrySelectProps {
    className?: string;
    label?: string;
    placeholder?: string;
    readonly?: boolean;
    value?: Country;
    onChangeValue?: (value: Country) => void;
}

export const CountrySelect = (props: CountrySelectProps) => {
    const { className, label, placeholder, readonly, value, onChangeValue } = props;
    const { t } = useTranslation('CountrySelect');

    const onChangeHendler = (value: Country) => {
        onChangeValue?.(value);
    };

    const countryOptions: ListBoxOption<Country, string>[] = [
        { value: Country.France, content: t(Country.France) },
        { value: Country.Italy, content: t(Country.Italy) },
        { value: Country.Russia, content: t(Country.Russia) },
        { value: Country.USA, content: t(Country.USA) },
        { value: Country.Japan, content: t(Country.Japan) },
    ];

    return (
        <ListBox
            className={className}
            defaultValue={placeholder}
            disabled={readonly}
            label={label}
            options={countryOptions}
            value={value}
            onChange={onChangeHendler}
        />
    );
};
