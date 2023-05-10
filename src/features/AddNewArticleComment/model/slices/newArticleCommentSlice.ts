import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { newArticleCommentSchema } from '../types/newArticleComment';
import { addNewCommentToArticle } from '../services/addNewCommentToArticle';

const initialState: newArticleCommentSchema = {
    isLoading: false,
};

export const newArticleCommentSlice = createSlice({
    name: 'newArticleComment',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addNewCommentToArticle.pending, (state, actions) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(addNewCommentToArticle.fulfilled, (state, actions: PayloadAction<void>) => {
                state.isLoading = false;
            })
            .addCase(addNewCommentToArticle.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            });
    },
});
export const { actions: newArticleCommentActions, reducer: newArticleCommentReducer } = newArticleCommentSlice;
