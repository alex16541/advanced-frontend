import { ArticleSortField, ArticleType } from 'entity/Article/model/types/article';
import { ArticleTypeChip } from 'features/ArticlesFilters/ui/ArticlesFilters';
import { SortOrder } from 'shared/types';

export interface ArticlesFiltersSchema {
    order: SortOrder;
    sort: ArticleSortField;
    type: ArticleTypeChip;
}
