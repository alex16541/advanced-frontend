import { memo } from 'react';
import { ProfileCard } from '@/entity/Profile';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useOnInit } from '@/shared/hooks/useOnInit';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';
import { useEditableProfileCard } from '../model/hooks/useEditableProfileCard';
import {
    featchProfileData,
} from '../model/services/featchProfileData/featchProfileData';
import { editableProfileCardReducer } from '../model/slices/editableProfileCardSlice';
import cls from './EditableProfileCard.module.scss';
import { EditableProfileCardHeader } from './EditableProfileCardHeader/EditableProfileCardHeader';
import { EditableProfileCardErrors } from './EditableProfileCardErrors/EditableProfileCardErrors';

const reducers: ReducersList = {
    editableProfileCard: editableProfileCardReducer,
};

interface EditableProfileCardProps {
    className?: string;
    profileId?: number | string;
}

const EditableProfileCard = (props: EditableProfileCardProps) => {
    const { className, profileId } = props;
    const dispatch = useAppDispatch();

    const {
        form,
        isLoading,
        error,
        validationErrors,
        profileError,
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
    } = useEditableProfileCard();

    useOnInit(() => {
        if (profileId) {
            dispatch(featchProfileData(profileId));
        }
    });

    return (
        <DynamicModuleLoader
            reducers={reducers}
            dataTestId="EditableProfileCard"
        >
            <VStack
                className={classNames(cls.EditableProfileCard, {}, [className])}
                max
                gap="10"
            >
                <EditableProfileCardHeader />
                <EditableProfileCardErrors validationErrors={validationErrors} />
                <ProfileCard
                    data={form}
                    isLoading={isLoading}
                    error={error && profileError[error]}
                    readonly={readonly}
                    onChangeUsername={onChangeUsername}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeEmail={onChangeEmail}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeCountry={onChangeCountry}
                    onChangePhone={onChangePhone}
                    onChangePhoto={onChangePhoto}
                    onChangeCurrency={onChangeCurrency}
                />
            </VStack>

        </DynamicModuleLoader>
    );
};

const Memoized = memo(EditableProfileCard);

export { Memoized as EditableProfileCard };
