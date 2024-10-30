import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile, ProfileError } from '@/entity/Profile';

export const featchProfileData = createAsyncThunk<Profile, string | number, ThunkConfig<ProfileError>>(
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
            return rejectWithValue('UNKNOWN_ERROR');
        }
    },
);
