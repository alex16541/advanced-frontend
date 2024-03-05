import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCommentsListIsLoading = (state: StateSchema) => state.articleComments?.isLoading ?? false;
export const getArticleCommentsListError = (state: StateSchema) => state.articleComments?.error ?? [];
