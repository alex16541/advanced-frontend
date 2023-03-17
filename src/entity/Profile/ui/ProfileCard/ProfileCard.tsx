import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader/ui/Loader';
import { Profile, ProfileErrors } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: ProfileErrors;
    readonly?: boolean;
    onChangeFirstname?: (value: string) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading = false,
        readonly = true,
        onChangeFirstname,
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
                <Text
                    title={`${t('profile loading error')}:`}
                    text={error}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>

            <div className={cls.data}>
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
                />
                <Input
                    className={cls.input}
                    value={data?.email}
                    placeholder={t('email')}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};
