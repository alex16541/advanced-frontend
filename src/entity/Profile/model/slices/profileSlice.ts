import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

const initialState: ProfileSchema = {
    isLoading: false,
    readonly: true,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setData: (state, actions) => {
            state.data = actions.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProfileData.pending, (state, actions) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, actions: PayloadAction<Profile>) => {
                state.data = actions.payload;
                state.isLoading = false;
            })
            .addCase(fetchProfileData.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            });
    },
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
