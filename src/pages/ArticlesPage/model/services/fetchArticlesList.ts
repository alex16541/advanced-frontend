import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entity/Article';
import { ArticlesPageErrors } from '../types/articlesPage';

export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig<ArticlesPageErrors[]>>(
    'article/fetchArticlesList',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        try {
            const state = getState();

            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _extend: 'user',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue([ArticlesPageErrors.SERVER_ERROR]);
        }
    },
);
