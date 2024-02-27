import { ArticleErrors } from '../consts/article';
import { Article } from './article';

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: ArticleErrors[];
    data?: Article;
}
