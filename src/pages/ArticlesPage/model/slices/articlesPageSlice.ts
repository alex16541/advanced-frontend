import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticlesListView } from 'entity/Article';
import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLES_PAGE_VIEW } from 'shared/const/localstorage';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

const initialState: ArticlesPageSchema = {
    isLoading: false,
    entities: {},
    ids: [],
    error: [],
    view: ArticlesListView.LIST,
    page: 0,
    limit: 3,
    hasMore: true,
};

const articlesPageAdapter = createEntityAdapter<Article>();

export const articlesPageSelectors = articlesPageAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesPageAdapter.getInitialState(),
);

export const articlesPageSlice = createSlice({
    name: 'articlesPage',
    initialState: articlesPageAdapter.getInitialState(initialState),
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        nextPage(state) {
            state.page += 1;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        setHasMore(state, action: PayloadAction<boolean>) {
            state.hasMore = action.payload;
        },
        setView(state, action: PayloadAction<ArticlesListView>) {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_PAGE_VIEW, action.payload);
        },
        initState(state) {
            const view = localStorage.getItem(ARTICLES_PAGE_VIEW) as ArticlesListView;
            state.view = view;
            state.limit = view === ArticlesListView.LIST ? 3 : 12;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
                articlesPageAdapter.addMany(state, action.payload);
                state.page += 1;
                state.hasMore = action.payload.length > 0;
                state.isLoading = false;
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { actions: articlesPageActions, reducer: articlesPageReducer } = articlesPageSlice;
