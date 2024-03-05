import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, StateSchema } from '@/app/providers/StoreProvider';
import { ArticleCommentsErrors } from '../../consts/articleCommentList';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addNewCommentToArticle = createAsyncThunk<void, string, ThunkConfig<ArticleCommentsErrors[]>>(
    'newArticleComment/addNewCommentToArticle',
    async (text, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        try {
            const state: StateSchema = getState();
            const userId = state.user.authData?.id;
            const articleId = state.articleDetails?.data?.id;

            if (!text || !userId || !articleId) {
                throw new Error(ArticleCommentsErrors.INVALID_DATA);
            }

            const data = {
                text,
                articleId,
                userId,
            };
            const response = await extra.api.post<void>('/comments', data);

            if (response.status) {
                throw new Error(ArticleCommentsErrors.SERVER_ERROR);
            }

            fetchCommentsByArticleId(articleId);

            return response.data;
        } catch (error: any) {
            return rejectWithValue([error.message as ArticleCommentsErrors]);
        }
    },
);
