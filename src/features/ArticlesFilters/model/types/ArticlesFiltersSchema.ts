import { ArticleSortField } from 'entity/Article';
import { SortOrder } from 'shared/types';
import { ArticleTypeChip } from './ariclesFilters';

export interface ArticlesFiltersSchema {
    order: SortOrder;
    sort: ArticleSortField;
    type: ArticleTypeChip;
}
