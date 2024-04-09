import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getAuthData } from '@/entity/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/FeatureToggle/FeatureToggle';
import { Button as ButtonDeprecated, ButtonColor, ButtonThemes } from '@/shared/ui/deprecated/Button';
import { Text } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileIsReadonly } from '../../model/selectors/getProfileIsReadonly/getProfileIsReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { editableProfileCardActions } from '../../model/slices/editableProfileCardSlice';

import cls from './EditableProfileCardHeader.module.scss';

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
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <div className={classNames(cls.EditableProfileCardHeader, {}, [className, 'title'])}>
                    <Text title={t('profile')} />
                    {canBeEdit && (
                        <div className={cls.actions}>
                            {readonly ? (
                                <ButtonDeprecated
                                    data-testid="EditableProfileCardHeader.EditButton"
                                    theme={ButtonThemes.OUTLINED}
                                    onClick={onEdit}
                                >
                                    {t('edit')}
                                </ButtonDeprecated>
                            ) : (
                                <>
                                    <ButtonDeprecated
                                        data-testid="EditableProfileCardHeader.SaveButton"
                                        theme={ButtonThemes.OUTLINED}
                                        onClick={onSave}
                                    >
                                        {t('Save')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        color={ButtonColor.RED}
                                        data-testid="EditableProfileCardHeader.CancelButton"
                                        theme={ButtonThemes.OUTLINED}
                                        onClick={onCalcelEdit}
                                    >
                                        {t('Cancel')}
                                    </ButtonDeprecated>
                                </>
                            )}
                        </div>
                    )}
                </div>
            }
            on={
                <div className={classNames(cls.EditableProfileCardHeaderRedesigned, {}, [className])}>
                    {canBeEdit && (
                        <div className={cls.actions}>
                            {readonly ? (
                                <Button data-testid="EditableProfileCardHeader.EditButton" onClick={onEdit}>
                                    {t('edit')}
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        data-testid="EditableProfileCardHeader.SaveButton"
                                        onClick={onSave}
                                    >
                                        {t('Save')}
                                    </Button>
                                    <Button
                                        color="red"
                                        data-testid="EditableProfileCardHeader.CancelButton"
                                        onClick={onCalcelEdit}
                                    >
                                        {t('Cancel')}
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            }
        />
    );
};

const Memoized = memo(EditableProfileCardHeader);

export { Memoized as EditableProfileCardHeader };
