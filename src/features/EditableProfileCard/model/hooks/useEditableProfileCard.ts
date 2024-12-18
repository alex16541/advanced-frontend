import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Country } from '@/entity/Country';
import { Currency } from '@/entity/Currency';
import { ProfileError } from '@/entity/Profile';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

import { getProfileError } from '../selectors/getProfileError/getProfileError';
import { getProfileForm } from '../selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileIsReadonly } from '../selectors/getProfileIsReadonly/getProfileIsReadonly';
import { getProfileValidationErrors } from '../selectors/getProfileValidationErrors/getProfileValidationErrors';
import { editableProfileCardActions } from '../slices/editableProfileCardSlice';

export const useEditableProfileCard = () => {
    const dispatch = useAppDispatch();
    const form = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const validationErrors = useSelector(getProfileValidationErrors);
    const readonly = useSelector(getProfileIsReadonly);

    const { t } = useTranslation('EditableProfileCard');

    const getErrorText = useCallback((error: ProfileError) => t(error), [t]);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(
                editableProfileCardActions.updateProfile({
                    username: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeFirstname = useCallback(
        (value: string) => {
            dispatch(
                editableProfileCardActions.updateProfile({
                    firstname: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeLastname = useCallback(
        (value: string) => {
            dispatch(
                editableProfileCardActions.updateProfile({
                    lastname: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(
                editableProfileCardActions.updateProfile({
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
                    editableProfileCardActions.updateProfile({
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
                editableProfileCardActions.updateProfile({
                    city: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangePhone = useCallback(
        (value: string) => {
            dispatch(
                editableProfileCardActions.updateProfile({
                    phone: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangePhoto = useCallback(
        (value: string) => {
            dispatch(
                editableProfileCardActions.updateProfile({
                    photo: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeCountry = useCallback(
        (value: Country) => {
            dispatch(
                editableProfileCardActions.updateProfile({
                    country: value || undefined,
                }),
            );
        },
        [dispatch],
    );

    const onChangeCurrency = useCallback(
        (value: Currency) => {
            dispatch(
                editableProfileCardActions.updateProfile({
                    currency: value || undefined,
                }),
            );
        },
        [dispatch],
    );

    return {
        form,
        isLoading,
        error,
        validationErrors,
        getErrorText,
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
};
