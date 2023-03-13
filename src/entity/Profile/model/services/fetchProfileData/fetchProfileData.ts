import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile, ProfileErrors } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ProfileErrors>>(
        'profile/fetchProfileData',
        async (_, thunkAPI) => {
            const {
                rejectWithValue,
                extra,
            } = thunkAPI;

            try {
                const response = await extra.api.get<Profile>('/profile');

                return response.data;
            } catch (error) {
                return rejectWithValue(ProfileErrors.UNKNOWN_ERROR);
            }
        },
    );
