import { Article, ArticleErrors } from './article';

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: ArticleErrors[];
    data?: Article;
}
