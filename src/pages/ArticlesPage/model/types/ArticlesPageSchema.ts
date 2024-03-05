import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleSortField, ArticlesListView } from '@/entity/Article';
import { SortOrder } from '@/shared/types';
import { ArticlesPageErrors } from '../consts/articlesPage';
import { ArticleTypeChip } from './ariclesFilters';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    isInitialLoading?: boolean;
    errors?: ArticlesPageErrors[];
    view: ArticlesListView;
    page: number;
    limit: number;
    hasMore: boolean;

    // filters
    order: SortOrder;
    sort: ArticleSortField;
    type: ArticleTypeChip;
    search: string;

    _inited: boolean;
}
