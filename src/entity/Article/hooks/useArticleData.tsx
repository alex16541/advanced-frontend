import { useCallback } from 'react';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useOnInit } from '@/shared/hooks/useOnInit';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import {
    getArticleDetailsData,
    getArticleDetailsIsLoading,
    getArticleDetailsErrors,
    getArticleDetailsIsOwner,
} from '../model/selectors/articleDetails';
import { fetchArticleById } from '../model/services/fetchArticleById/fetchArticleById';
import { Article } from '../model/types/article';
import { ArticleErrorType } from '../model/types/articleError';
import { articleDetailsReducer } from '../testing';
import { ArticleErrorBoundary } from '../ui/ArticleErrorBoundary/ArticleErrorBoundary';

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

interface UseArticleDataOptions {
    articleId?: string;
    ownerOnly?: boolean;
}

export const useArticleData = (options: UseArticleDataOptions) => {
    const { articleId, ownerOnly } = options;
    const dispatch = useAppDispatch();

    const articleData = useAppSelector(getArticleDetailsData);
    const isLoading = useAppSelector(getArticleDetailsIsLoading);
    const errors = useAppSelector(getArticleDetailsErrors);
    const isOwner = useAppSelector(getArticleDetailsIsOwner);

    const fetchArticle = useCallback(
        (id: string) => {
            dispatch(fetchArticleById(id));
        },
        [dispatch],
    );

    useOnInit(() => {
        if (!articleId || (articleData && articleData.id === articleId)) return;

        fetchArticle(articleId);
    });

    let error: ArticleErrorType | null = null;

    if (isLoading) {
        error = null;
    } else if (!articleId) {
        error = 'NO_DATA';
    } else if (errors.length > 0) {
        [error] = errors;
    } else if (ownerOnly && !isOwner) {
        error = 'FORBIDDEN';
    } else if (!articleData) {
        error = 'UNKNOWN_ERROR';
    }

    const content = error && <ArticleErrorBoundary error={error} />;

    return {
        errors: content,
        isLoading,
        // articleData garantee that it's not undefined
        articleData: articleData as Article,
        reducers,
        isOwner,
    };
};
