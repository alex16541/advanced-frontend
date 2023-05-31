import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading || false;
export const selectArticlesPageErrors = (state: StateSchema) => state.articlesPage?.error || [];
export const selectArticlesPageView = (state: StateSchema) => state.articlesPage?.view;
