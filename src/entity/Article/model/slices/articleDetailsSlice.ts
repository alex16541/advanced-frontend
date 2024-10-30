import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { ArticleErrorType } from '../types/articleError';

const initialState: ArticleDetailsSchema = {
    isLoading: false,
};

export const articleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {
        setArticle: (state, action: PayloadAction<Article | undefined>) => {
            state.data = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setErrors: (state, action: PayloadAction<ArticleErrorType[] | undefined>) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticleById.pending, (state, actions) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state, actions: PayloadAction<Article>) => {
                state.data = actions.payload;
                state.isLoading = false;
            })
            .addCase(
                fetchArticleById.rejected,
                (state, actions: PayloadAction<ArticleErrorType[] | undefined>) => {
                    state.isLoading = false;
                    state.error = actions.payload;
                },
            );
    },
});
export const { actions: articleDetailsActions, reducer: articleDetailsReducer } = articleDetailsSlice;
