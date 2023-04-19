import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { fetchArticleById } from '../services/getArticleById/fetchArticleById';

const initialState: ArticleDetailsSchema = {
    isLoading: false,
};

export const articleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
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
            .addCase(fetchArticleById.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            });
    },
});
export const { actions: articleDetailsActions, reducer: articleDetailsReducer } = articleDetailsSlice;
