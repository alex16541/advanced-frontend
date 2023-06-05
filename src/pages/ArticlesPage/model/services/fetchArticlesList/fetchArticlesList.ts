import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entity/Article';
import { ArticlesPageErrors } from '../../types/articlesPage';
import { selectArticlesPageLimit } from '../../selectors/articlesPageSelectors';

interface FetchArticlesListOptions {
    page?: number;
    limit?: number;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListOptions,
    ThunkConfig<ArticlesPageErrors[]>
>('article/fetchArticlesList', async (options, thunkAPI) => {
    const { rejectWithValue, extra, getState } = thunkAPI;
    const { page = 1, limit = 3 } = options;

    try {
        const state = getState();

        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _page: page,
                _limit: limit,
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
});
