import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    selectArticlesPageHasMore,
    selectArticlesPageIsLoading,
    selectArticlesPageLimit,
    selectArticlesPagePage,
} from '../../selectors/articlesPageSelectors';
import { ArticlesPageErrors } from '../../types/articlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<ArticlesPageErrors[]>>(
    'article/fetchNextArticlesPage',
    async (_, thunkAPI) => {
        const { getState, dispatch } = thunkAPI;

        const state = getState();
        const page = selectArticlesPagePage(state);
        const limit = selectArticlesPageLimit(state);
        const hasMore = selectArticlesPageHasMore(state);
        const isLoading = selectArticlesPageIsLoading(state);

        if (hasMore && !isLoading) {
            dispatch(fetchArticlesList({ page: page + 1, limit }));
        }
    },
);
