import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entity/Profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { getProfileData } from '../../selectors/getProfileData/getProfileData';
import { ProfileValidateErrors } from '../../types/editableProfileCardSchema';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ProfileValidateErrors[]>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
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

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue([ProfileValidateErrors.SERVER_ERROR]);
        }
    },
);
