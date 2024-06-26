import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entity/User';
import { LAST_USED_THEME, USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';

export enum LoginErrors {
    NOT_VALID_AUTH_DATA,
}

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<LoginErrors>>(
    'user/loginByUsername',
    async (authData, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;

        try {
            const response = await extra.api.post<User>('/login', authData);

            if (!response.data) throw new Error();

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data.id));
            localStorage.setItem(LAST_USED_THEME, JSON.stringify(response.data.jsonSettings?.theme));

            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (error) {
            return rejectWithValue(LoginErrors.NOT_VALID_AUTH_DATA);
        }
    },
);
