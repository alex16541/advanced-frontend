import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile, ProfileErrors } from '@/entity/Profile';

export const featchProfileData = createAsyncThunk<Profile, string | number, ThunkConfig<ProfileErrors>>(
    'profile/fetchProfileData',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;

        try {
            const response = await extra.api.get<Profile>(`/profile/${id}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(ProfileErrors.UNKNOWN_ERROR);
        }
    },
);
