import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ArticlesPageErrors } from '../../types/articlesPage';
import { selectArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchNextArticlesPage } from '../fetchNextArticlesPage/fetchNextArticlesPage';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<ArticlesPageErrors[]>>(
    'articlesPage/initArticlesPage',
    (_, thunkApi) => {
        const { dispatch, getState } = thunkApi;

        const state = getState();
        const inited = selectArticlesPageInited(state);

        if (!inited) {
            dispatch(articlesPageActions.initState());
            dispatch(fetchNextArticlesPage());
        }
    },
);
