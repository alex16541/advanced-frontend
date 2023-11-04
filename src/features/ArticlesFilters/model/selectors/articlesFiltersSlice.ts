import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleSortField } from 'entity/Article/model/types/article';

export const selectArticlesFiltersSort = (state: StateSchema) => state.articlesFilters?.sort ?? ArticleSortField.TITLE;
export const selectArticlesFiltersOrder = (state: StateSchema) => state.articlesFilters?.order ?? 'asc';
export const selectArticlesFiltersType = (state: StateSchema) => state.articlesFilters?.type;
