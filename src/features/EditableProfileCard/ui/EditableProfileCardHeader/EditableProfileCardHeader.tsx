import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonColor, ButtonThemes } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text/Text';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getAuthData } from '@/entity/User';
import cls from './EditableProfileCardHeader.module.scss';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileIsReadonly } from '../../model/selectors/getProfileIsReadonly/getProfileIsReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { editableProfileCardActions } from '../../model/slices/editableProfileCardSlice';

interface EditableProfileCardHeaderProps {
    className?: string;
}

const EditableProfileCardHeader = (props: EditableProfileCardHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const authData = useSelector(getAuthData);
    const profileData = useSelector(getProfileData);
    const readonly = useSelector(getProfileIsReadonly);
    const canBeEdit = authData?.id === profileData?.id;

    const onEdit = useCallback(() => {
        dispatch(editableProfileCardActions.setReadonly(false));
    }, [dispatch]);

    const onCalcelEdit = useCallback(() => {
        dispatch(editableProfileCardActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        if (profileData?.id) {
            dispatch(updateProfileData());
        }
    }, [dispatch, profileData?.id]);
    return (
        <div className={classNames(cls.EditableProfileCardHeader, {}, [className, 'title'])}>
            <Text title={t('profile')} />
            {canBeEdit && (
                <div className={cls.actions}>
                    {readonly ? (
                        <Button
                            theme={ButtonThemes.OUTLINED}
                            onClick={onEdit}
                            data-testid="EditableProfileCardHeader.EditButton"
                        >
                            {t('edit')}
                        </Button>
                    ) : (
                        <>
                            <Button
                                theme={ButtonThemes.OUTLINED}
                                onClick={onSave}
                                data-testid="EditableProfileCardHeader.SaveButton"
                            >
                                {t('Save')}
                            </Button>
                            <Button
                                theme={ButtonThemes.OUTLINED}
                                color={ButtonColor.RED}
                                onClick={onCalcelEdit}
                                data-testid="EditableProfileCardHeader.CancelButton"
                            >
                                {t('Cancel')}
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

const Memoized = memo(EditableProfileCardHeader);

export { Memoized as EditableProfileCardHeader };
