import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Country, CountrySelect } from '@/entity/Country';
import { Currency, CurrencySelect } from '@/entity/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

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
            <Card className={classNames(cls.ProfileCard, mods, [className, cls.isLoading])}>
                <VStack align="Center" gap="32" maxWidth>
                    <Skeleton height={120} width={120} />
                    <HStack gap="24" maxWidth>
                        <VStack gap="16" maxWidth>
                            <Skeleton height={32} width="100%" />
                            <Skeleton height={32} width="100%" />
                            <Skeleton height={32} width="100%" />
                            <Skeleton height={32} width="100%" />
                            <Skeleton height={32} width="100%" />
                        </VStack>
                        <VStack gap="16" maxWidth>
                            <Skeleton height={32} width="100%" />
                            <Skeleton height={32} width="100%" />
                            <Skeleton height={32} width="100%" />
                            <Skeleton height={32} width="100%" />
                            <Skeleton height={32} width="100%" />
                        </VStack>
                    </HStack>
                </VStack>
            </Card>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, mods, [className, cls.error])}>
                <Text align="center" text={error} title={`${t('profile error')}`} />
            </div>
        );
    }

    return (
        <Card className={classNames(cls.ProfileCard, mods, [className, cls.data])}>
            {data?.photo && (
                <div className={cls.avatarWrapper}>
                    <Avatar alt={t('user avatar')} size={120} src={data?.photo} />
                </div>
            )}

            <HStack gap="24" maxWidth>
                <VStack gap="16" maxWidth>
                    <Input
                        className={cls.input}
                        data-testid="ProfileCard.Username"
                        label={t('username')}
                        readonly={readonly}
                        value={data?.username}
                        onChange={onChangeUsername}
                    />
                    <Input
                        className={cls.input}
                        data-testid="ProfileCard.Firstname"
                        label={t('firstname')}
                        readonly={readonly}
                        value={data?.firstname}
                        onChange={onChangeFirstname}
                    />
                    <Input
                        className={cls.input}
                        data-testid="ProfileCard.Lastname"
                        label={t('lastname')}
                        readonly={readonly}
                        value={data?.lastname || ''}
                        onChange={onChangeLastname}
                    />
                    <Input
                        className={cls.input}
                        data-testid="ProfileCard.Email"
                        label={t('email')}
                        readonly={readonly}
                        value={data?.email}
                        onChange={onChangeEmail}
                    />
                    <Input
                        className={cls.input}
                        data-testid="ProfileCard.Age"
                        label={t('age')}
                        readonly={readonly}
                        value={data?.age?.toString()}
                        onChange={onChangeAge}
                    />
                </VStack>
                <VStack gap="16" maxWidth>
                    <Input
                        className={cls.input}
                        data-testid="ProfileCard.City"
                        label={t('city')}
                        readonly={readonly}
                        value={data?.city}
                        onChange={onChangeCity}
                    />
                    <CountrySelect
                        className={cls.input}
                        data-testid="ProfileCard.Country"
                        label={t('country')}
                        readonly={readonly}
                        value={data?.country}
                        onChangeValue={onChangeCountry}
                    />
                    <Input
                        className={cls.input}
                        data-testid="ProfileCard.Phone"
                        label={t('phone')}
                        readonly={readonly}
                        value={data?.phone}
                        onChange={onChangePhone}
                    />
                    <Input
                        className={cls.input}
                        data-testid="ProfileCard.Photo"
                        label={t('photo')}
                        readonly={readonly}
                        value={data?.photo}
                        onChange={onChangePhoto}
                    />
                    <CurrencySelect
                        className={cls.input}
                        data-testid="ProfileCard.Currency"
                        label={t('currency')}
                        readonly={readonly}
                        value={data?.currency}
                        onChangeValue={onChangeCurrency}
                    />
                </VStack>
            </HStack>
        </Card>
    );
};

const Memoized = memo(ProfileCard);

export { Memoized as ProfileCard };
