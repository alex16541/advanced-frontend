import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign } from '@/shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader/ui/Loader';
import { Country, CountrySelect } from '@/entity/Country';
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from '@/entity/Currency';
import { memo } from 'react';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
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

const ProfileCard = (props: ProfileCardProps) => {
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

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, mods, [className, cls.error])}>
                <Text title={`${t('profile error')}:`} text={error} align={TextAlign.CENTER} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className, cls.data])}>
            {data?.photo && (
                <div className={cls.avatarWrapper}>
                    <Avatar size={AvatarSize.L} src={data?.photo} alt={t('user avatar')} />
                </div>
            )}

            <Input
                className={cls.input}
                value={data?.username}
                placeholder={t('username')}
                readonly={readonly}
                onChange={onChangeUsername}
                data-testid="ProfileCard.Username"
            />
            <Input
                className={cls.input}
                value={data?.firstname}
                placeholder={t('firstname')}
                readonly={readonly}
                onChange={onChangeFirstname}
                data-testid="ProfileCard.Firstname"
            />
            <Input
                className={cls.input}
                value={data?.lastname || ''}
                placeholder={t('lastname')}
                readonly={readonly}
                onChange={onChangeLastname}
                data-testid="ProfileCard.Lastname"
            />
            <Input
                className={cls.input}
                value={data?.email}
                placeholder={t('email')}
                readonly={readonly}
                onChange={onChangeEmail}
                data-testid="ProfileCard.Email"
            />
            <Input
                className={cls.input}
                value={data?.age?.toString()}
                placeholder={t('age')}
                readonly={readonly}
                onChange={onChangeAge}
                data-testid="ProfileCard.Age"
            />
            <Input
                className={cls.input}
                value={data?.city}
                placeholder={t('city')}
                readonly={readonly}
                onChange={onChangeCity}
                data-testid="ProfileCard.City"
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                placeholder={t('country')}
                readonly={readonly}
                onChangeValue={onChangeCountry}
                data-testid="ProfileCard.Country"
            />
            <Input
                className={cls.input}
                value={data?.phone}
                placeholder={t('phone')}
                readonly={readonly}
                onChange={onChangePhone}
                data-testid="ProfileCard.Phone"
            />
            <Input
                className={cls.input}
                value={data?.photo}
                placeholder={t('photo')}
                readonly={readonly}
                onChange={onChangePhoto}
                data-testid="ProfileCard.Photo"
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                placeholder={t('currency')}
                readonly={readonly}
                onChangeValue={onChangeCurrency}
                data-testid="ProfileCard.Currency"
            />
        </div>
    );
};

const Memoized = memo(ProfileCard);

export { Memoized as ProfileCard };
