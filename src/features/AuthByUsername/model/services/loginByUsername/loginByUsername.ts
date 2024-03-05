import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from '@/entity/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { ThunkConfig, ThunkExtraArg } from '@/app/providers/StoreProvider';

export enum LoginErrors {
    NOT_VALID_AUTH_DATA
}

interface LoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<LoginErrors>>(
        'user/loginByUsername',
        async (authData, thunkAPI) => {
            const {
                dispatch,
                rejectWithValue,
                extra,
            } = thunkAPI;

            try {
                const response = await extra.api.post<User>('/login', authData);

                if (!response.data) throw new Error();

                localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
                dispatch(userActions.setAuthData(response.data));

                return response.data;
            } catch (error) {
                return rejectWithValue(LoginErrors.NOT_VALID_AUTH_DATA);
            }
        },
    );
