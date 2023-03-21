import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { validateProfileData } from '../services/validateProfileData/validateProfileData';

const initialState: ProfileSchema = {
    isLoading: false,
    readonly: true,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile: (state, actions: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...actions.payload,
            };
        },
        setReadonly: (state, actions: PayloadAction<boolean>) => {
            state.readonly = actions.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.validateErrors = undefined;
            state.form = { ...state.data };
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
                state.form = actions.payload;
                state.isLoading = false;
            })
            .addCase(fetchProfileData.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            })
            .addCase(updateProfileData.pending, (state, actions) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, actions: PayloadAction<Profile>) => {
                state.data = actions.payload;
                state.form = actions.payload;
                state.validateErrors = undefined;
                state.readonly = true;
                state.isLoading = false;
            })
            .addCase(updateProfileData.rejected, (state, actions) => {
                state.isLoading = false;
                state.validateErrors = actions.payload;
            });
    },
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
