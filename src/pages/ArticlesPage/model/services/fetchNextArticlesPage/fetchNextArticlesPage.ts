import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    selectArticlesFiltersOrder,
    selectArticlesFiltersSort,
    selectArticlesFiltersType,
    selectArticlesFiltersSearch,
} from '../../selectors/articlesFiltersSlice';
import {
    selectArticlesPageErrors,
    selectArticlesPageHasMore,
    selectArticlesPageIsLoading,
    selectArticlesPageLimit,
    selectArticlesPagePage,
} from '../../selectors/articlesPageSelectors';
import { ArticlesPageErrors } from '../../consts/articlesPage';
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
    const query = selectArticlesFiltersSearch(state);
    const hasMore = selectArticlesPageHasMore(state);
    const isLoading = selectArticlesPageIsLoading(state);
    const sort = selectArticlesFiltersSort(state);
    const order = selectArticlesFiltersOrder(state);
    const type = selectArticlesFiltersType(state)?.value;
    const errors = selectArticlesPageErrors(state);

    if (hasMore && !isLoading && !errors.length) {
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
