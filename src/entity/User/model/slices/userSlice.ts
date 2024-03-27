import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';
import { setFeatureFlags } from '@/shared/lib/features';

import { changeUserJsonSettings } from '../services/changeUserJsonSettings/changeUserJsonSettings';
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
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);

            if (user) {
                const json = JSON.parse(user);
                state.authData = json;
                setFeatureFlags(json.features);
            }

            state._inited = true;
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers(builder) {
        builder.addCase(
            changeUserJsonSettings.fulfilled,
            (state, { payload }: PayloadAction<JsonSettings>) => {
                if (!state.authData) return;

                state.authData.jsonSettings = payload;
            },
        );
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
