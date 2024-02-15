import { ArticleSortField } from 'entity/Article/model/types/article';
import { SortOrder } from 'shared/types';
import { ArticleTypeChip } from '../../ui/ArticlesFilters';

export interface ArticlesFiltersSchema {
    order: SortOrder;
    sort: ArticleSortField;
    type: ArticleTypeChip;
}
