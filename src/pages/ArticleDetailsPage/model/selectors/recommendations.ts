import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticleRecommendationsIsLoading = (state: StateSchema) => state.articleRecommendations?.isLoading;
export const selectArticleRecommendationsError = (state: StateSchema) => state.articleRecommendations?.error;
