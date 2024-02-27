import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleSortField, ArticleType } from 'entity/Article/';
import { SortOrder } from 'shared/types';
import { ArticleTypeChip } from '../types/ariclesFilters';
import { ArticlesFiltersSchema } from '../types/ArticlesFiltersSchema';
import { typeOptions } from '../consts/articlesFiltersConsts';

const initialState: ArticlesFiltersSchema = {
    sort: ArticleSortField.CREATED,
    order: 'asc',
    type: { value: ArticleType.ALL, label: 'Все темы', selected: true },
};

export const articlesFiltersSlice = createSlice({
    name: 'articlesFilters',
    initialState,
    reducers: {
        initFilters: (
            state,
            {
                payload,
            }: PayloadAction<{
                order?: SortOrder | null;
                sort?: ArticleSortField | null;
                type?: ArticleType | null;
            }>,
        ) => {
            if (payload.order) state.order = payload.order;
            if (payload.sort) state.sort = payload.sort;
            if (payload.type) {
                const type = typeOptions.find((opt) => opt.value === payload.type);
                if (type) state.type = type;
            }
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
    },
});
export const { actions: articlesFiltersActions, reducer: articlesFiltersReducer } = articlesFiltersSlice;
