import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { selectArticleSearchValue } from 'features/ArticleSearch';
import {
    selectArticlesFiltersOrder,
    selectArticlesFiltersSort,
    selectArticlesFiltersType,
} from 'features/ArticlesFilters/model/selectors/articlesFiltersSlice';
import {
    selectArticlesPageHasMore,
    selectArticlesPageIsLoading,
    selectArticlesPageLimit,
    selectArticlesPagePage,
} from '../../selectors/articlesPageSelectors';
import { ArticlesPageErrors } from '../../types/articlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';

export interface FetchNextArticlesPageOptions {
    replace?: boolean;
}

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    FetchNextArticlesPageOptions | void,
    ThunkConfig<ArticlesPageErrors[]>
>('article/fetchNextArticlesPage', async (options, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;

    const replace = options?.replace ?? false;

    if (replace) {
        dispatch(articlesPageActions.setHasMore(true));
        dispatch(articlesPageActions.setPage(0));
    }

    const state = getState();
    const page = selectArticlesPagePage(state);
    const limit = selectArticlesPageLimit(state);
    const query = selectArticleSearchValue(state);
    const hasMore = selectArticlesPageHasMore(state);
    const isLoading = selectArticlesPageIsLoading(state);
    const sort = selectArticlesFiltersSort(state);
    const order = selectArticlesFiltersOrder(state);
    const type = selectArticlesFiltersType(state)?.value;

    if (hasMore && !isLoading) {
        dispatch(
            fetchArticlesList({
                page: page + 1,
                limit,
                query,
                replace,
                sort,
                order,
                type,
            }),
        );
    }
});
