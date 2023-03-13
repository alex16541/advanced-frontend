import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Button, ButtonThemes } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsReadonly } from '../../model/selectors/getProfileIsReadonly/getProfileIsReadonly';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { className } = props;

    const { t } = useTranslation('profile');

    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileIsReadonly);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('profile')} />
                <Button theme={ButtonThemes.OUTLINED}>{t('edit')}</Button>
            </div>
            <div className={cls.data}>
                <Input
                    className={cls.input}
                    value={data?.username}
                    placeholder={t('username')}
                />
                <Input
                    className={cls.input}
                    value={data?.email}
                    placeholder={t('email')}
                />
            </div>
        </div>
    );
};
