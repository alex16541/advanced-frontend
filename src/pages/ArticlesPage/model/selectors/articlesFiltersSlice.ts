import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortField } from '@/entity/Article';
import { ArticleTypeChipOptions } from '@/features/ArticleTypeChips';

export const selectArticlesFiltersSort = (state: StateSchema) =>
    state.articlesPage?.sort ?? ArticleSortField.TITLE;
export const selectArticlesFiltersOrder = (state: StateSchema) => state.articlesPage?.order ?? 'asc';
export const selectArticlesFiltersType = (state: StateSchema) =>
    state.articlesPage?.type ?? ArticleTypeChipOptions[0];
export const selectArticlesFiltersSearch = (state: StateSchema) => state.articlesPage?.search ?? '';
