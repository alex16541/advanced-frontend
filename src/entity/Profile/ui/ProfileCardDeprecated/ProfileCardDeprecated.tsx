import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Country, CountrySelect } from '@/entity/Country';
import { Currency, CurrencySelect } from '@/entity/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar, AvatarSize } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader/ui/Loader';
import { Text, TextAlign } from '@/shared/ui/deprecated/Text';

import { Profile } from '../../model/types/profile';

import cls from './ProfileCardDeprecated.module.scss';

interface ProfileCardDeprecatedProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
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

const ProfileCardDeprecated = (props: ProfileCardDeprecatedProps) => {
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
            <div className={classNames(cls.ProfileCardDeprecated, mods, [className, cls.isLoading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCardDeprecated, mods, [className, cls.error])}>
                <Text align={TextAlign.CENTER} text={error} title={`${t('profile error')}:`} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProfileCardDeprecated, mods, [className, cls.data])}>
            {data?.photo && (
                <div className={cls.avatarWrapper}>
                    <Avatar alt={t('user avatar')} size={AvatarSize.L} src={data?.photo} />
                </div>
            )}

            <Input
                className={cls.input}
                data-testid="ProfileCard.Username"
                placeholder={t('username')}
                readonly={readonly}
                value={data?.username}
                onChange={onChangeUsername}
            />
            <Input
                className={cls.input}
                data-testid="ProfileCard.Firstname"
                placeholder={t('firstname')}
                readonly={readonly}
                value={data?.firstname}
                onChange={onChangeFirstname}
            />
            <Input
                className={cls.input}
                data-testid="ProfileCard.Lastname"
                placeholder={t('lastname')}
                readonly={readonly}
                value={data?.lastname || ''}
                onChange={onChangeLastname}
            />
            <Input
                className={cls.input}
                data-testid="ProfileCard.Email"
                placeholder={t('email')}
                readonly={readonly}
                value={data?.email}
                onChange={onChangeEmail}
            />
            <Input
                className={cls.input}
                data-testid="ProfileCard.Age"
                placeholder={t('age')}
                readonly={readonly}
                value={data?.age?.toString()}
                onChange={onChangeAge}
            />
            <Input
                className={cls.input}
                data-testid="ProfileCard.City"
                placeholder={t('city')}
                readonly={readonly}
                value={data?.city}
                onChange={onChangeCity}
            />
            <CountrySelect
                className={cls.input}
                data-testid="ProfileCard.Country"
                placeholder={t('country')}
                readonly={readonly}
                value={data?.country}
                onChangeValue={onChangeCountry}
            />
            <Input
                className={cls.input}
                data-testid="ProfileCard.Phone"
                placeholder={t('phone')}
                readonly={readonly}
                value={data?.phone}
                onChange={onChangePhone}
            />
            <Input
                className={cls.input}
                data-testid="ProfileCard.Photo"
                placeholder={t('photo')}
                readonly={readonly}
                value={data?.photo}
                onChange={onChangePhoto}
            />
            <CurrencySelect
                className={cls.input}
                data-testid="ProfileCard.Currency"
                placeholder={t('currency')}
                readonly={readonly}
                value={data?.currency}
                onChangeValue={onChangeCurrency}
            />
        </div>
    );
};

const Memoized = memo(ProfileCardDeprecated);

export { Memoized as ProfileCardDeprecated };
