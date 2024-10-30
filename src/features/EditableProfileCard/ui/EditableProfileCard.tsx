import { ProfileCard } from '@/entity/Profile';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useOnInit } from '@/shared/hooks/useOnInit';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { useEditableProfileCard } from '../model/hooks/useEditableProfileCard';
import { featchProfileData } from '../model/services/featchProfileData/featchProfileData';
import { editableProfileCardReducer } from '../model/slices/editableProfileCardSlice';

import cls from './EditableProfileCard.module.scss';
import { EditableProfileCardErrors } from './EditableProfileCardErrors/EditableProfileCardErrors';
import { EditableProfileCardHeader } from './EditableProfileCardHeader/EditableProfileCardHeader';
import '../i18n/i18n';

const reducers: ReducersList = {
    editableProfileCard: editableProfileCardReducer,
};

interface EditableProfileCardProps {
    className?: string;
    profileId?: number | string;
}

export const EditableProfileCard = (props: EditableProfileCardProps) => {
    const { className, profileId } = props;
    const dispatch = useAppDispatch();

    const {
        form,
        isLoading,
        error,
        validationErrors,
        readonly,
        getErrorText,
        onChangeAge,
        onChangeCity,
        onChangeCountry,
        onChangeCurrency,
        onChangeEmail,
        onChangeFirstname,
        onChangeLastname,
        onChangePhone,
        onChangePhoto,
        onChangeUsername,
    } = useEditableProfileCard();

    useOnInit(() => {
        if (profileId) {
            dispatch(featchProfileData(profileId));
        }
    });

    const profileProps = {
        data: form,
        error: error && getErrorText(error),
        isLoading,
        readonly,
        onChangeAge,
        onChangeCity,
        onChangeCountry,
        onChangeCurrency,
        onChangeEmail,
        onChangeFirstname,
        onChangeLastname,
        onChangePhone,
        onChangePhoto,
        onChangeUsername,
    };

    return (
        <DynamicModuleLoader dataTestId="EditableProfileCard" reducers={reducers}>
            <VStack className={classNames(cls.EditableProfileCard, {}, [className])} gap="10" maxWidth>
                <EditableProfileCardHeader />
                <EditableProfileCardErrors validationErrors={validationErrors} />
                <ProfileCard {...profileProps} />
            </VStack>
        </DynamicModuleLoader>
    );
};
