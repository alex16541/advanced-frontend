import { rtkApi } from '@/shared/api/rtkApi';

import { ArticleRating } from '../model/types/articleRating';

interface GetArticleRatingArgs {
    articleId: number | string;
    userId: number | string;
}

const url = '/articles-rating';

const extendedApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<ArticleRating[], GetArticleRatingArgs>({
            query: ({ articleId, userId }) => ({
                url,
                method: 'GET',
                params: {
                    articleId,
                    userId,
                },
            }),
        }),
        rateArticle: build.mutation<void, ArticleRating>({
            query: (articleRating) => ({
                url,
                method: 'POST',
                body: articleRating,
            }),
        }),
    }),
});

export const { useGetArticleRatingQuery, useRateArticleMutation } = extendedApi;
