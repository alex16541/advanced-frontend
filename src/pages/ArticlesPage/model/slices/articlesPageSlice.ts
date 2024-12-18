import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import {
    ArticlesListCountPeerView,
    ArticlesListView,
    ArticleSortField,
    ArticleType,
    Article,
} from '@/entity/Article';
import { ArticleTypeChip, ArticleTypeChipOptions } from '@/features/ArticleTypeChips';
import { ARTICLES_PAGE_VIEW } from '@/shared/consts/localstorage';
import { SortOrder } from '@/shared/types/sort';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';

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
    sort: ArticleSortField.VIEWS,
    order: 'desc',
    type: { value: ArticleType.ALL, label: ArticleType.ALL, selected: true },
    search: '',
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
            localStorage.setItem(ARTICLES_PAGE_VIEW, payload);
            state.limit = ArticlesListCountPeerView[payload];
        },
        initState(
            state,
            {
                payload,
            }: PayloadAction<{
                order?: SortOrder | null;
                sort?: ArticleSortField | null;
                type?: ArticleType | null;
                search?: string;
            }>,
        ) {
            const view =
                (localStorage.getItem(ARTICLES_PAGE_VIEW) as ArticlesListView) ?? ArticlesListView.LIST;
            state.view = view;
            state.limit = ArticlesListCountPeerView[view];
            state._inited = true;

            if (payload.order) state.order = payload.order;
            if (payload.sort) state.sort = payload.sort;
            if (payload.search) state.search = payload.search;
            if (payload.type) {
                const type = ArticleTypeChipOptions.find((opt) => opt.value === payload.type);
                if (type) state.type = type;
            }
        },
        resetErrors(state) {
            state.errors = [];
        },
        setSort: (state, { payload }: PayloadAction<ArticleSortField>) => {
            state.sort = payload;
        },
        setOrder: (state, { payload }: PayloadAction<SortOrder>) => {
            state.order = payload;
        },
        setType: (state, { payload }: PayloadAction<ArticleTypeChip>) => {
            state.type = payload;
        },
        setSearch: (state, { payload }: PayloadAction<string>) => {
            state.search = payload;
        },
        setInitialLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isInitialLoading = payload;
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
            });
    },
});
export const { actions: articlesPageActions, reducer: articlesPageReducer } = articlesPageSlice;
