import { Article } from '@/entity/Article';
import { rtkApi } from '@/shared/api/rtkApi';

const extendedApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        fetchArticleRecommendations: build.query<Article[], number | void>({
            query: (limit = 6) => ({
                url: '/articles',
                method: 'GET',
                params: {
                    _page: 1,
                    _limit: limit,
                    _expand: 'user',
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useFetchArticleRecommendationsQuery } = extendedApi;
