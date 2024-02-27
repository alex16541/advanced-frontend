import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticlesListCountPeerView, ArticlesListView } from 'entity/Article';
import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLES_PAGE_VIEW } from 'shared/const/localstorage';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { initArticlesPage } from '../services/initArticlesPage/initArticlesPage';

const initialState: ArticlesPageSchema = {
    isLoading: false,
    isInitialLoading: false,
    entities: {},
    ids: [],
    errors: [],
    view: ArticlesListView.LIST,
    page: 0,
    limit: 3,
    hasMore: true,
    _inited: false,
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
        setView(state, { payload }: PayloadAction<ArticlesListView>) {
            state.view = payload;
            state.limit = ArticlesListCountPeerView[payload];
            state.page = 0;
            articlesPageAdapter.removeAll(state);
            localStorage.setItem(ARTICLES_PAGE_VIEW, payload);
        },
        initState(state) {
            const view = localStorage.getItem(ARTICLES_PAGE_VIEW) as ArticlesListView;
            state.view = view;
            state.limit = ArticlesListCountPeerView[view];
            state._inited = true;
        },
        resetErrors(state) {
            state.errors = [];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.errors = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    articlesPageAdapter.removeAll(state);
                    state.page = 0;
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
                articlesPageAdapter.addMany(state, action.payload);
                state.page += 1;
                state.hasMore = action.payload.length === state.limit;
                state.isLoading = false;
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })
            .addCase(initArticlesPage.pending, (state) => {
                state.isInitialLoading = true;
            })
            .addCase(initArticlesPage.fulfilled, (state) => {
                state.isInitialLoading = false;
            })
            .addCase(initArticlesPage.rejected, (state) => {
                state.isInitialLoading = false;
            });
    },
});
export const { actions: articlesPageActions, reducer: articlesPageReducer } = articlesPageSlice;
