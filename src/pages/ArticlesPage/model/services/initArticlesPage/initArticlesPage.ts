import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from '@/entity/Article';
import { SortOrder } from '@/shared/types';

import { ArticlesPageErrors } from '../../consts/articlesPage';
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
            dispatch(articlesPageActions.setInitialLoading(true));
            const order = searchParams.get('order') as SortOrder;
            const sort = searchParams.get('sort') as ArticleSortField;
            const type = searchParams.get('type') as ArticleType;
            const search = searchParams.get('search') ?? '';
            dispatch(articlesPageActions.initState({
                order, sort, type, search,
            }));
            dispatch(articlesPageActions.setInitialLoading(false));
            dispatch(fetchNextArticlesPage());
        }
    },
);
