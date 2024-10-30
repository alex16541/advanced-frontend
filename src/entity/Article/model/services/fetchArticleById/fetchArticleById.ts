import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AppError } from '@/shared/types/AppError';

import { Article } from '../../types/article';
import { ArticleError, ArticleErrorType } from '../../types/articleError';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<ArticleErrorType[]>>(
    'articleDetails/getArticleById',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        try {
            const state = getState();

            const response = await extra.api.get<Article>(`/articles/${id}`, {
                params: {
                    _expand: 'user',
                },
            });

            if (response.status !== 200) {
                throw new ArticleError(response.status);
            }

            return response.data;
        } catch (e) {
            if (AppError.isApiError(e)) {
                return rejectWithValue([e.code]);
            }

            return rejectWithValue(['UNKNOWN_ERROR']);
        }
    },
);
