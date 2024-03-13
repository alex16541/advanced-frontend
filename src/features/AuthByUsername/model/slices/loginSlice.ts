import { createSlice } from '@reduxjs/toolkit';

import { loginByUsername } from '../services/loginByUsername/loginByUsername';
import { LoginSchema } from '../types/loginSchema';

const initialState: LoginSchema = {
    username: '',
    password: '',
    isLoading: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, actions) => {
            state.username = actions.payload;
        },
        setPassword: (state, actions) => {
            state.password = actions.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loginByUsername.pending, (state, actions) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state, actions) => {
                state.isLoading = false;
            })
            .addCase(loginByUsername.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            });
    },
});

export const { actions: loginActions, reducer: loginReducer } = loginSlice;
