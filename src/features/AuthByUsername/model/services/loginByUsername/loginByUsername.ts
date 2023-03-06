import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entity/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export enum LoginErrors {
    NOT_VALID_AUTH_DATA
}

interface LoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: LoginErrors }>(
    'user/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post<User>('http://localhost:3001/login', authData);

            if (!response.data) throw new Error();

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(LoginErrors.NOT_VALID_AUTH_DATA);
        }
    },
);
