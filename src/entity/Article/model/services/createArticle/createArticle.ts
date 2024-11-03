import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getAuthData } from '@/entity/User';
import { AppErrorType } from '@/shared/types/errors';

import { createArticle as createArticleApi } from '../../../api/api';
import { ArticleContent, Article } from '../../types/article';

export const createArticle = createAsyncThunk<Article, ArticleContent | void, ThunkConfig<AppErrorType[]>>(
    'Article/createArticle',
    async (article, thunkAPI) => {
        const { rejectWithValue, extra, getState, dispatch } = thunkAPI;

        const state = getState();
        const userData = getAuthData(state);

        try {
            if (!userData) {
                return rejectWithValue(['NO_DATA']);
            }

            const articleBase: ArticleContent = {
                createdAt: new Date().toLocaleDateString(),
                views: 0,
                title: 'New article',
                editorState:
                    // eslint-disable-next-line max-len
                    '{"root":{"children":[{"children":[],"direction":null,"format":"left","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
                img: '',
                updatedAt: new Date().toLocaleDateString(),
                type: [],
            };

            const newArticle: ArticleContent = { ...articleBase, ...article };

            const response = await dispatch(
                createArticleApi({ userId: userData.id, articleContent: newArticle }),
            ).unwrap();

            if (!response) return rejectWithValue(['NO_DATA']);

            return response;
        } catch (error) {
            return rejectWithValue(['SERVER_ERROR']);
        }
    },
);
