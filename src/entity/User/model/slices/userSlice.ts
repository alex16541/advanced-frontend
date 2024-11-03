import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';
import { setFeatureFlags } from '@/shared/lib/features';

import { changeUserJsonSettings } from '../services/changeUserJsonSettings/changeUserJsonSettings';
import { initAuthData } from '../services/initAuthData/initAuthData';
import { JsonSettings } from '../types/jsonSettings';
import { User, UserSchema } from '../types/userSchema';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, actions: PayloadAction<User>) => {
            state.authData = actions.payload;
        },
        setAvatar: (state, actions: PayloadAction<string>) => {
            if (state.authData) {
                state.authData.avatar = actions.payload;
            }
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(changeUserJsonSettings.fulfilled, (state, { payload }: PayloadAction<JsonSettings>) => {
                if (!state.authData) return;

                state.authData.jsonSettings = payload;
            })
            .addCase(initAuthData.fulfilled, (state, { payload }: PayloadAction<User>) => {
                state.authData = payload;
                setFeatureFlags(payload.features);
                state._inited = true;
            })
            .addCase(initAuthData.rejected, (state) => {
                state._inited = true;
            });
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
