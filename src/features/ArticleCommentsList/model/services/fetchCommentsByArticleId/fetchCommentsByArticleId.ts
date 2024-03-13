import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entity/Comment';

import { ArticleCommentsErrors } from '../../consts/articleCommentList';

export const fetchCommentsByArticleId = createAsyncThunk<Comment[], string, ThunkConfig<ArticleCommentsErrors[]>>(
    'articleComments/fetchCommentsByArticleId',
    async (articleId, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;

        try {
            const response = await extra.api.get<Comment[]>('/comments', {
                params: {
                    articleId,
                    _expand: 'user',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue([ArticleCommentsErrors.SERVER_ERROR]);
        }
    },
);
