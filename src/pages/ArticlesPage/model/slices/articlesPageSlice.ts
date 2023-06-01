import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticlesListView } from 'entity/Article';
import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLES_PAGE_VIEW } from 'shared/const/localstorage';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList';

const initialState: ArticlesPageSchema = {
    isLoading: false,
    entities: {},
    ids: [],
    error: [],
    view: ArticlesListView.LIST,
};

const articlesPageAdapter = createEntityAdapter<Article>();

export const articlesPageSelectors = articlesPageAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesPageAdapter.getInitialState(),
);

export const articlesPageSlice = createSlice({
    name: 'articlesPage',
    initialState: articlesPageAdapter.getInitialState(initialState),
    reducers: {
        setView(state, action: PayloadAction<ArticlesListView>) {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_PAGE_VIEW, action.payload);
        },
        initState(state) {
            state.view = localStorage.getItem(ARTICLES_PAGE_VIEW) as ArticlesListView;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticlesList.pending, (state, actions) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesList.fulfilled, (state, actions: PayloadAction<Article[]>) => {
                articlesPageAdapter.setAll(state, actions.payload);
                state.isLoading = false;
            })
            .addCase(fetchArticlesList.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            });
    },
});
export const { actions: articlesPageActions, reducer: articlesPageReducer } = articlesPageSlice;
