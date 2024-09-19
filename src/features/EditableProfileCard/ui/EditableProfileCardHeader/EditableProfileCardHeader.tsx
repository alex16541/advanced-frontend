import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getAuthData } from '@/entity/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

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
        
                        <HStack
                            className={classNames(cls.EditableProfileCardHeaderRedesigned, {}, [className])}
                            gap="32"
                            justify="SpaceBetween"
                            maxWidth
                        >
                            <Text size="l" title={t('profile')} weight="bold" />
                            {canBeEdit && (
                                <>
                                    {readonly ? (
                                        <Button data-testid="EditableProfileCardHeader.EditButton" onClick={onEdit}>
                                            {t('edit')}
                                        </Button>
                                    ) : (
                                        <HStack gap="8">
                                            <Button
                                                color="save"
                                                data-testid="EditableProfileCardHeader.SaveButton"
                                                onClick={onSave}
                                            >
                                                {t('Save')}
                                            </Button>
                                            <Button
                                                color="cancel"
                                                data-testid="EditableProfileCardHeader.CancelButton"
                                                onClick={onCalcelEdit}
                                            >
                                                {t('Cancel')}
                                            </Button>
                                        </HStack>
                                    )}
                                </>
                            )}
                        </HStack>
                    
    );
};

const Memoized = memo(EditableProfileCardHeader);

export { Memoized as EditableProfileCardHeader };
