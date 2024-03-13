import { createSelector } from '@reduxjs/toolkit';

import { getArticleDetailsData } from '@/entity/Article';
import { getAuthData } from '@/entity/User';

export const selectIsUserCanEditArticle = createSelector(getArticleDetailsData, getAuthData, (article, user) => {
    if (!article || !user) {
        return false;
    }

    return article.user.id === user.id;
});
