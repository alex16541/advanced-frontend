import { rtkApi } from '@/shared/api/rtkApi';

import { ArticleUtils, ArticleContent, Article } from '../model/types/article';

interface CreateArticleOptions {
    userId: string;
    articleContent: ArticleContent;
}

const extendedApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        saveArticle: build.mutation<Article, Article>({
            query: (article) => ({
                url: `/articles/${article.id}`,
                method: 'PUT',
                body: ArticleUtils.exportToServer(article),
            }),
        }),
        createArticle: build.query<Article, CreateArticleOptions>({
            query: ({ userId, articleContent }) => ({
                url: `/articles`,
                method: 'POST',
                body: {
                    ...articleContent,
                    userId,
                },
            }),
        }),
        deleteArticle: build.mutation<void, string>({
            query: (articleId) => ({
                url: `/articles/${articleId}`,
                method: 'DELETE',
                body: articleId,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useSaveArticleMutation, useCreateArticleQuery } = extendedApi;
export const saveArticle = extendedApi.endpoints.saveArticle.initiate;
export const createArticle = extendedApi.endpoints.createArticle.initiate;
export const deleteArticle = extendedApi.endpoints.deleteArticle.initiate;
