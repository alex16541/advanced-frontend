import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { ArticleSortField, ArticleType } from 'entity/Article';
import { SortOrder } from 'shared/types';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { ChipList, ChipListOption } from 'shared/ui/Chip';
import { ListBox } from 'shared/ui/Popups/ui/ListBox/ListBox';
import { ListBoxOption } from 'shared/ui/Popups/types/listBox';
import { HStack, VStack } from 'shared/ui/Stack';
import cls from './ArticlesFilters.module.scss';
import {
    selectArticlesFiltersOrder,
    selectArticlesFiltersSort,
    selectArticlesFiltersType,
} from '../../model/selectors/articlesFiltersSlice';
import { typeOptions } from '../../model/consts/articlesFilters';
import { ArticlesFiltersSearch } from '../ArticlesFiltersSearch/ArticlesFiltersSearch';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';

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
            max
            gap="10"
            className={classNames(cls.ArticlesFilters, {}, [className])}
        >
            <ArticlesFiltersSearch isLoading={isLoading} onSearch={onLoadData} />
            <HStack gap="10">
                <ListBox
                    wrapperClassName={cls.field}
                    options={sortOptions}
                    value={sort}
                    label={t('Sort by')}
                    onChange={sortChange}
                />
                <ListBox
                    wrapperClassName={cls.field}
                    options={orderOptions}
                    value={order}
                    label={t('Sort by')}
                    onChange={orderChange}
                />
            </HStack>
            {type && <ChipList options={typeOptions} value={type} onClick={typeChange} />}
        </VStack>
    );
};

const Memoized = memo(ArticlesFilters);

export { Memoized as ArticlesFilters };
