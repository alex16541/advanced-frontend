import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticlesListView } from 'entity/Article';
import { ArticlesPageErrors } from './articlesPage';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: ArticlesPageErrors[];
    view: ArticlesListView;
    page: number;
    limit: number;
    hasMore: boolean;
}
