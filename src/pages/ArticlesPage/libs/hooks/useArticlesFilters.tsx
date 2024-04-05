import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entity/Article';
import { ArticleTypeChip } from '@/features/ArticleTypeChips';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { SortOrder } from '@/shared/types/sort';

import {
    selectArticlesFiltersOrder,
    selectArticlesFiltersSearch,
    selectArticlesFiltersSort,
    selectArticlesFiltersType,
} from '../../model/selectors/articlesFiltersSlice';
import { selectArticlesPageIsInitialLoading } from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';

export const useArticlesFilters = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('article');
    const order = useAppSelector(selectArticlesFiltersOrder);
    const sort = useAppSelector(selectArticlesFiltersSort);
    const type = useAppSelector(selectArticlesFiltersType);
    const search = useAppSelector(selectArticlesFiltersSearch);

    const isLoading = useAppSelector(selectArticlesPageIsInitialLoading);
    const loadData = useDebounce(() => dispatch(fetchNextArticlesPage({ replace: true })), 500);

    const searchChange = useCallback(
        (str: string) => {
            dispatch(articlesPageActions.setSearch(str));
            loadData();
        },
        [dispatch, loadData],
    );

    const sortChange = useCallback(
        (val: ArticleSortField) => {
            dispatch(articlesPageActions.setSort(val));
            loadData();
        },
        [dispatch, loadData],
    );

    const orderChange = useCallback(
        (val: SortOrder) => {
            dispatch(articlesPageActions.setOrder(val));
            loadData();
        },
        [dispatch, loadData],
    );

    const typeChange = useCallback(
        (chip: ArticleTypeChip) => {
            dispatch(articlesPageActions.setType(chip));
            loadData();
        },
        [dispatch, loadData],
    );

    return {
        t,
        order,
        sort,
        type,
        search,
        isLoading,
        searchChange,
        sortChange,
        orderChange,
        typeChange,
    };
};
