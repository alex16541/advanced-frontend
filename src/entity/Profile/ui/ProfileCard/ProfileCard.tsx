import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextThemes } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader/ui/Loader';
import { Country } from 'entity/Country/model/types/country';
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entity/Currency';
import { CountrySelect } from 'entity/Country';
import { FC, memo, useMemo } from 'react';
import { Profile, ProfileErrors, ProfileValidateErrors } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: ProfileErrors;
    validationErrors?: ProfileValidateErrors[];
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

export const ProfileCard = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        validationErrors = [],
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

    const validationError = useMemo(
        () => ({
            [ProfileValidateErrors.NO_DATA]: t('profile no data'),
            [ProfileErrors.SERVER_ERROR]: t('server error'),
            [ProfileValidateErrors.INCORRECT_USER_DATA]: t('incorrect user data'),
            [ProfileValidateErrors.INCORRECT_AGE]: t('incorrect age'),
            [ProfileValidateErrors.INCORRECT_EMAIL]: t('incorrect email'),
        }),
        [t],
    );

    const profileError = useMemo(
        () => ({
            [ProfileErrors.SERVER_ERROR]: t('server error'),
            [ProfileErrors.UNKNOWN_ERROR]: t('unknown error'),
        }),
        [t],
    );

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
                <Text title={`${t('profile loading error')}:`} text={profileError[error]} align={TextAlign.CENTER} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            {validationErrors.map((err) => (
                <Text key={err} theme={TextThemes.ERROR} text={validationError[err]} />
            ))}
            <div className={cls.data}>
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
});
