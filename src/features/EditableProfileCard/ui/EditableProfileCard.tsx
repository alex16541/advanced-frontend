import { ProfileCard } from 'entity/Profile';
import { memo } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useOnInit } from 'shared/hooks/useOnInit';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useEditableProfileCard } from '../model/hooks/useEditableProfileCard';
import {
    featchProfileData,
} from '../model/services/featchProfileData/featchProfileData';
import { editableProfileCardReducer } from '../model/slices/editableProfileCardSlice';
import cls from './EditableProfileCard.module.scss';
import { EditableProfileCardHeader } from './ProfilePageHeader/EditableProfileCardHeader';

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
        <DynamicModuleLoader reducers={reducers} className={classNames(cls.EditableProfileCard, {}, [className])}>
            <EditableProfileCardHeader />
            <ProfileCard
                data={form}
                isLoading={isLoading}
                error={error}
                validationErrors={validationErrors}
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
        </DynamicModuleLoader>
    );
};

const Memoized = memo(EditableProfileCard);

export { Memoized as EditableProfileCard };
