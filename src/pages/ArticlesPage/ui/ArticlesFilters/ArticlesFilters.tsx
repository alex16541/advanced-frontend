import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField, ArticleType } from '@/entity/Article';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types';
import { ChipList, ChipListOption } from '@/shared/ui/Chip';
import { ListBoxOption } from '@/shared/ui/Popups/types/listBox';
import { ListBox } from '@/shared/ui/Popups/ui/ListBox/ListBox';
import { HStack, VStack } from '@/shared/ui/Stack';

import { typeOptions } from '../../model/consts/articlesFilters';
import {
    selectArticlesFiltersOrder,
    selectArticlesFiltersSort,
    selectArticlesFiltersType,
} from '../../model/selectors/articlesFiltersSlice';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import { ArticlesFiltersSearch } from '../ArticlesFiltersSearch/ArticlesFiltersSearch';

import cls from './ArticlesFilters.module.scss';

interface ArticlesFilterProps {
    className?: string;
    isLoading?: boolean;
    onLoadData?: () => void;
}

const sortOptions: ListBoxOption<ArticleSortField>[] = [
    { value: ArticleSortField.CREATED, content: 'дате создания' },
    { value: ArticleSortField.TITLE, content: 'названию' },
    { value: ArticleSortField.VIEWS, content: 'просмотрам' },
];

const orderOptions: ListBoxOption<SortOrder>[] = [
    { value: 'asc', content: 'возрастанию' },
    { value: 'desc', content: 'убыванию' },
];
export type ArticleTypeChip = ChipListOption<ArticleType>;

const ArticlesFilters = (props: ArticlesFilterProps) => {
    const { className, isLoading, onLoadData } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('article');
    const order = useAppSelector(selectArticlesFiltersOrder);
    const sort = useAppSelector(selectArticlesFiltersSort);
    const type = useAppSelector(selectArticlesFiltersType);

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
            // TODO: Надо придумать как тут сводить один ко многим или многие ко многим
            // написать какой формат где используется во всём алгоритме (компонент, стэйт, url)
            // ChipOption <-mapper-> typeOption <-> string

            dispatch(articlesPageActions.setType(chip));
            onLoadData?.();
        },
        [dispatch, onLoadData],
    );

    return (
        <VStack
            className={classNames(cls.ArticlesFilters, {}, [className])}
            gap="10"
            maxWidth
        >
            <ArticlesFiltersSearch isLoading={isLoading} onSearch={onLoadData} />
            <HStack gap="10">
                <ListBox
                    label={t('Sort by')}
                    options={sortOptions}
                    value={sort}
                    wrapperClassName={cls.field}
                    onChange={sortChange}
                />
                <ListBox
                    label={t('Sort by')}
                    options={orderOptions}
                    value={order}
                    wrapperClassName={cls.field}
                    onChange={orderChange}
                />
            </HStack>
            {type && <ChipList options={typeOptions} value={type} onClick={typeChange} />}
        </VStack>
    );
};

const Memoized = memo(ArticlesFilters);

export { Memoized as ArticlesFilters };
