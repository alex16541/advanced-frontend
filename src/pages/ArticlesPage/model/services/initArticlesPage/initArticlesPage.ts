import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articlesFiltersActions } from 'features/ArticlesFilters/model/slices/articlesFiltersSlice';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entity/Article/model/types/article';
import { articleSearchActions } from 'features/ArticleSearch/model/slieces/articleSearchSlice';
import { ArticlesPageErrors } from '../../types/articlesPage';
import { selectArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchNextArticlesPage } from '../fetchNextArticlesPage/fetchNextArticlesPage';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<ArticlesPageErrors[]>>(
    'articlesPage/initArticlesPage',
    (searchParams, thunkApi) => {
        const { dispatch, getState } = thunkApi;

        const state = getState();
        const inited = selectArticlesPageInited(state);

        if (!inited) {
            const order = searchParams.get('order') as SortOrder;
            const sort = searchParams.get('sort') as ArticleSortField;
            const type = searchParams.get('type') as ArticleType;
            const search = searchParams.get('search');
            dispatch(articlesFiltersActions.initFilters({ order, sort, type }));
            dispatch(articleSearchActions.setValue(search ?? ''));
            dispatch(articlesPageActions.initState());
            dispatch(fetchNextArticlesPage());
        }
    },
);
