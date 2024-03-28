import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';

import { getUserData } from '../../../api/api';
import { User } from '../../types/userSchema';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<void>>(
    'user/initAuthData',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState, dispatch } = thunkAPI;

        try {
            const userId = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY) ?? '');

            if (!userId) return rejectWithValue();

            const response = await dispatch(getUserData(userId)).unwrap();

            if (!response) {
                return rejectWithValue();
            }

            return response;
        } catch (error) {
            return rejectWithValue();
        }
    },
);
