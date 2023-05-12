import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    fetchProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileIsReadonly,
    profileActions,
    ProfileCard,
    profileReducer,
    getProfileForm,
    getProfileValidationErrors,
} from 'entity/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Country } from 'entity/Country';
import { Currency } from 'entity/Currency';
import { useOnInit } from 'shared/hooks/useOnInit';
import { useParams } from 'react-router-dom';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = () => {
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const { id: profileId } = useParams<{ id: string }>();

    const form = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const validationErrors = useSelector(getProfileValidationErrors);
    const readonly = useSelector(getProfileIsReadonly);

    useOnInit(() => {
        if (profileId) {
            dispatch(fetchProfileData(profileId));
        }
    });

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(
                profileActions.updateProfile({
                    username: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeFirstname = useCallback(
        (value: string) => {
            dispatch(
                profileActions.updateProfile({
                    firstname: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeLastname = useCallback(
        (value: string) => {
            dispatch(
                profileActions.updateProfile({
                    lastname: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(
                profileActions.updateProfile({
                    email: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeAge = useCallback(
        (value: string) => {
            if (/^\d+$/.test(value || '0')) {
                dispatch(
                    profileActions.updateProfile({
                        age: Number(value || 0),
                    }),
                );
            }
        },
        [dispatch],
    );

    const onChangeCity = useCallback(
        (value: string) => {
            dispatch(
                profileActions.updateProfile({
                    city: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangePhone = useCallback(
        (value: string) => {
            dispatch(
                profileActions.updateProfile({
                    phone: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangePhoto = useCallback(
        (value: string) => {
            dispatch(
                profileActions.updateProfile({
                    photo: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeCountry = useCallback(
        (value: Country) => {
            dispatch(
                profileActions.updateProfile({
                    country: value || undefined,
                }),
            );
        },
        [dispatch],
    );

    const onChangeCurrency = useCallback(
        (value: Currency) => {
            dispatch(
                profileActions.updateProfile({
                    currency: value || undefined,
                }),
            );
        },
        [dispatch],
    );
    return (
        <DynamicModuleLoader reducers={reducers}>
            <div>
                <ProfilePageHeader />
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
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
