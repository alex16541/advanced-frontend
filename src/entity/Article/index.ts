export { useArticleData } from './hooks/useArticleData';

export { ArticleErrorBoundary } from './ui/ArticleErrorBoundary/ArticleErrorBoundary';
export { ArticleDetailsSkeleton } from './ui/ArticleDetailsSkeleton/ArticleDetailsSkeleton';
export { ArticlesList, ArticlesListCountPeerView } from './ui/ArticlesList/ArticlesList';

export { useSaveArticleMutation, saveArticle, deleteArticle } from './api/api';

export { article } from './mock/data';
export { articleDetailsReducer, articleDetailsActions } from './model/slices/articleDetailsSlice';
export {
    getArticleDetailsData,
    getArticleDetailsErrors,
    getArticleDetailsIsLoading,
    getArticleDetailsIsOwner,
} from './model/selectors/articleDetails';
export { createArticle } from './model/services/createArticle/createArticle';
export { fetchArticleById } from './model/services/fetchArticleById/fetchArticleById';

export type { ArticleContent, Article } from './model/types/article';
export type { ArticleErrorType } from './model/types/articleError';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export { ArticleError } from './model/types/articleError';
export { ArticleUtils } from './model/types/article';

export { ArticleSortField, ArticleType, ArticlesListView } from './model/consts/article';
