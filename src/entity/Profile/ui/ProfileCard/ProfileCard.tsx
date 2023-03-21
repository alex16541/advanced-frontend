import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader/ui/Loader';
import { Country } from 'entity/Country/model/types/country';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entity/Currency';
import { CountrySelect } from 'entity/Country';
import { Profile, ProfileErrors } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: ProfileErrors;
    readonly?: boolean;
    onChangeUsername?: (value: string) => void;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeEmail?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeCountry?: (value: Country) => void;
    onChangePhone?: (value: string) => void;
    onChangePhoto?: (value: string) => void;
    onChangeCurrency?: (value: Currency) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading = false,
        readonly = true,
        onChangeUsername,
        onChangeFirstname,
        onChangeLastname,
        onChangeEmail,
        onChangeAge,
        onChangeCity,
        onChangeCountry,
        onChangePhone,
        onChangePhoto,
        onChangeCurrency,
    } = props;

    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, mods, [className, cls.isLoading])}>
                <Loader />
            </div>
        );
    }

    // todo: Add switch to errors. Mayby need create one global AppError type. (Translation of errors - is main problem)
    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, mods, [className, cls.error])}>
                <Text
                    title={`${t('profile loading error')}:`}
                    text={t(error)}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.data}>
                {data?.photo && (
                    <div className={cls.avatarWrapper}>
                        <Avatar
                            size={100}
                            src={data?.photo}
                            alt={t('user avatar')}
                        />
                    </div>
                )}

                <Input
                    className={cls.input}
                    value={data?.username}
                    placeholder={t('username')}
                    readonly={readonly}
                    onChange={onChangeUsername}
                />
                <Input
                    className={cls.input}
                    value={data?.firstname}
                    placeholder={t('firstname')}
                    readonly={readonly}
                    onChange={onChangeFirstname}
                />
                <Input
                    className={cls.input}
                    value={data?.lastname || ''}
                    placeholder={t('lastname')}
                    readonly={readonly}
                    onChange={onChangeLastname}
                />
                <Input
                    className={cls.input}
                    value={data?.email}
                    placeholder={t('email')}
                    readonly={readonly}
                    onChange={onChangeEmail}
                />
                <Input
                    className={cls.input}
                    value={data?.age?.toString()}
                    placeholder={t('age')}
                    readonly={readonly}
                    onChange={onChangeAge}
                />
                <Input
                    className={cls.input}
                    value={data?.city}
                    placeholder={t('city')}
                    readonly={readonly}
                    onChange={onChangeCity}
                />
                <CountrySelect
                    className={cls.input}
                    value={data?.country}
                    placeholder={t('country')}
                    readonly={readonly}
                    onChangeValue={onChangeCountry}
                />
                <Input
                    className={cls.input}
                    value={data?.phone}
                    placeholder={t('phone')}
                    readonly={readonly}
                    onChange={onChangePhone}
                />
                <Input
                    className={cls.input}
                    value={data?.photo}
                    placeholder={t('photo')}
                    readonly={readonly}
                    onChange={onChangePhoto}
                />
                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    placeholder={t('photo')}
                    readonly={readonly}
                    onChangeValue={onChangeCurrency}
                />
            </div>
        </div>
    );
};
