import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entity/Article';
import { ArticleOrderSelector } from '@/features/ArticleOrderSelector';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeChips, ArticleTypeChip } from '@/features/ArticleTypeChips';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/deprecated/Input';
import { HStack, VStack } from '@/shared/ui/deprecated/Stack';

import {
    selectArticlesFiltersOrder,
    selectArticlesFiltersSearch,
    selectArticlesFiltersSort,
    selectArticlesFiltersType,
} from '../../model/selectors/articlesFiltersSlice';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';

import cls from './ArticlesFilters.module.scss';

interface ArticlesFilterProps {
    className?: string;
    isLoading?: boolean;
    onLoadData?: () => void;
}

const ArticlesFilters = (props: ArticlesFilterProps) => {
    const { className, isLoading, onLoadData } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('article');
    const order = useAppSelector(selectArticlesFiltersOrder);
    const sort = useAppSelector(selectArticlesFiltersSort);
    const type = useAppSelector(selectArticlesFiltersType);
    const search = useAppSelector(selectArticlesFiltersSearch);

    const searchChange = useCallback(
        (str: string) => {
            dispatch(articlesPageActions.setSearch(str));
            onLoadData?.();
        },
        [dispatch, onLoadData],
    );

    const sortChange = useCallback(
        (val: ArticleSortField) => {
            dispatch(articlesPageActions.setSort(val));
            onLoadData?.();
        },
        [dispatch, onLoadData],
    );

    const orderChange = useCallback(
        (val: SortOrder) => {
            dispatch(articlesPageActions.setOrder(val));
            onLoadData?.();
        },
        [dispatch, onLoadData],
    );

    const typeChange = useCallback(
        (chip: ArticleTypeChip) => {
            dispatch(articlesPageActions.setType(chip));
            onLoadData?.();
        },
        [dispatch, onLoadData],
    );

    return (
        <VStack className={classNames(cls.ArticlesFilters, {}, [className])} gap="10" maxWidth>
            <Input
                isLoading={isLoading}
                placeholder={t('Search')}
                value={search}
                fullWidth
                onChange={searchChange}
            />
            <HStack gap="10">
                <ArticleSortSelector className={cls.field} value={sort} onChange={sortChange} />
                <ArticleOrderSelector className={cls.field} value={order} onChange={orderChange} />
            </HStack>
            <ArticleTypeChips value={type} onChange={typeChange} />
        </VStack>
    );
};

const Memoized = memo(ArticlesFilters);

export { Memoized as ArticlesFilters };
