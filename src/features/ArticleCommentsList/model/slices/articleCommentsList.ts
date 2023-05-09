import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from 'entity/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleCommentsSchema } from '../types/ArticleCommentsSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

const initialState: ArticleCommentsSchema = {
    isLoading: false,
    entities: {},
    ids: [],
    error: [],
};

const articleCommentsAdapter = createEntityAdapter<Comment>();

export const articleCommentsSelectors = articleCommentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleComments || articleCommentsAdapter.getInitialState(),
);

export const articleCommentsSlice = createSlice({
    name: 'articleComments',
    initialState: articleCommentsAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state, actions) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (state, actions: PayloadAction<Comment[]>) => {
                articleCommentsAdapter.setAll(state, actions.payload);
                state.isLoading = false;
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            });
    },
});
export const { reducer: articleCommentsReducer } = articleCommentsSlice;
