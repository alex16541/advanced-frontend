import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { getAuthData } from '@/entity/User';

import { ArticleUtils } from '../types/article';

export const getArticleDetailsData = (state: StateSchema) => state.articleDetails?.data ?? null;
export const getArticleDetailsErrors = (state: StateSchema) => state.articleDetails?.error ?? [];
export const getArticleDetailsIsLoading = (state: StateSchema) => state.articleDetails?.isLoading ?? false;
export const getArticleDetailsIsOwner = createSelector(
    getAuthData,
    getArticleDetailsData,
    (user, article) => {
        if (!user || !article) return false;

        return ArticleUtils.isUserOwner(article, user.id);
    },
);
