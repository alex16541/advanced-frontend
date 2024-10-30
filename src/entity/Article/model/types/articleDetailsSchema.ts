import { Article } from './article';
import { ArticleErrorType } from './articleError';

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: ArticleErrorType[];
    data?: Article;
}
