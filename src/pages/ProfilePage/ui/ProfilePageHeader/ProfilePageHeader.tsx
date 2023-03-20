import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonColor, ButtonThemes } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { getProfileIsReadonly, profileActions, updateProfileData } from 'entity/Profile';
import { useSelector } from 'react-redux';
import { FC, memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = memo((props: ProfilePageHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();
    const readonly = useSelector(getProfileIsReadonly);

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCalcelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className, 'title'])}>
            <Text title={t('profile')} />
            <div className={cls.actions}>
                {readonly ? (
                    <Button
                        theme={ButtonThemes.OUTLINED}
                        onClick={onEdit}
                    >
                        {t('edit')}
                    </Button>
                ) : (
                    <>
                        <Button
                            theme={ButtonThemes.OUTLINED}
                            onClick={onSave}
                        >
                            {t('Save')}
                        </Button>
                        <Button
                            theme={ButtonThemes.OUTLINED}
                            color={ButtonColor.RED}
                            onClick={onCalcelEdit}
                        >
                            {t('Cancel')}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
});
