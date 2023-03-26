import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile, ProfileValidateErrors } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ProfileValidateErrors[]>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        try {
            const state = getState();
            const validationErrors = validateProfileData(state.profile);
            if (validationErrors.length > 0) {
                return rejectWithValue(validationErrors);
            }

            const data = getProfileForm(state);
            const response = await extra.api.put<Profile>('/profile', data);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue([ProfileValidateErrors.SERVER_ERROR]);
        }
    },
);
