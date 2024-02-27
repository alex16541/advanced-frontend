import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticlesListView } from 'entity/Article';
import { ArticlesPageErrors } from './articlesPage';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    isInitialLoading?: boolean;
    errors?: ArticlesPageErrors[];
    view: ArticlesListView;
    page: number;
    limit: number;
    hasMore: boolean;

    _inited: boolean;
}
