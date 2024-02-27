import { StateSchema } from 'app/providers/StoreProvider';
import { ArticlesListView } from 'entity/Article';

export const selectArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading || false;
export const selectArticlesPageIsInitialLoading = (state: StateSchema) => state.articlesPage?.isInitialLoading || false;
export const selectArticlesPageErrors = (state: StateSchema) => state.articlesPage?.errors || [];
export const selectArticlesPageView = (state: StateSchema) => state.articlesPage?.view || ArticlesListView.LIST;
export const selectArticlesPagePage = (state: StateSchema) => state.articlesPage?.page || 0;
export const selectArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit ?? 3;
export const selectArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore ?? false;
export const selectArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited ?? false;
