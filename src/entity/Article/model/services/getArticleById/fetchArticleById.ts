import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article, ArticleErrors } from '../../types/article';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<ArticleErrors[]>>(
    'articleDetails/getArticleById',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        try {
            const state = getState();

            const data = {};
            const response = await extra.api.get<Article>(`/articles/${id}`, data);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue([ArticleErrors.SERVER_ERROR]);
        }
    },
);
