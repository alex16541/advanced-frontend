import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile, ProfileError } from '@/entity/Profile';
import { AppError } from '@/shared/types/AppError';

import { ProfileValidateError } from '../../consts/profile';
import { getProfileData } from '../../selectors/getProfileData/getProfileData';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ProfileError | ProfileValidateError[]>
>('profile/updateProfileData', async (_, thunkAPI) => {
    const { rejectWithValue, extra, getState } = thunkAPI;

    try {
        const state = getState();
        const validationErrors = validateProfileData(state.editableProfileCard);
        if (validationErrors.length > 0) {
            return rejectWithValue(validationErrors);
        }
        const formData = getProfileData(state);
        const data = getProfileForm(state);
        const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, data);

        if (response.status !== 200) {
            throw new AppError(response.status);
        }

        return response.data;
    } catch (e) {
        if (AppError.isApiError(e)) {
            return rejectWithValue(e.code);
        }

        return rejectWithValue('UNKNOWN_ERROR');
    }
});
