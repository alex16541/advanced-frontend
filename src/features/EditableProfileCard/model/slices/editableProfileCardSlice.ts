import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Profile } from '@/entity/Profile';

import { featchProfileData } from '../services/featchProfileData/featchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { EditableProfileCardSchema } from '../types/editableProfileCardSchema';

const initialState: EditableProfileCardSchema = {
    isLoading: false,
    readonly: true,
};

export const editableProfileCardSlice = createSlice({
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
            .addCase(featchProfileData.pending, (state, actions) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(featchProfileData.fulfilled, (state, actions: PayloadAction<Profile>) => {
                state.data = actions.payload;
                state.form = actions.payload;
                state.isLoading = false;
            })
            .addCase(featchProfileData.rejected, (state, actions) => {
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

export const { actions: editableProfileCardActions, reducer: editableProfileCardReducer } = editableProfileCardSlice;
