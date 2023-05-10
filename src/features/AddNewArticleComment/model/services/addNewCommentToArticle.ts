import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { newArticleCommentError } from '../types/newArticleComment';

export const addNewCommentToArticle = createAsyncThunk<void, void, ThunkConfig<newArticleCommentError[]>>(
    'newArticleComment/addNewCommentToArticle',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        try {
            const state = getState();

            const data = {};
            const response = await extra.api.post<void>('/comments', data);

            if (!response) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue([newArticleCommentError.SERVER_ERROR]);
        }
    },
);
