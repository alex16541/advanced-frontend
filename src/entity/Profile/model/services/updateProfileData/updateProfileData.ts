import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile, ProfileErrors } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ProfileErrors>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        try {
            const state = getState();
            const data = getProfileForm(state);
            const response = await extra.api.put<Profile>('/profile', data);

            return response.data;
        } catch (error) {
            return rejectWithValue(ProfileErrors.UNKNOWN_ERROR);
        }
    },
);
