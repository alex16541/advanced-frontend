import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { ArticleSortField, ArticleType } from 'entity/Article';
import { SortOrder } from 'shared/types';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { ChipList, ChipListOption } from 'shared/ui/Chip';
import { ListBoxOption, ListBox } from 'shared/ui/ListBox/ListBox';
import cls from './ArticlesFilters.module.scss';
import { articlesFiltersActions, articlesFiltersReducer } from '../model/slices/articlesFiltersSlice';
import {
    selectArticlesFiltersOrder,
    selectArticlesFiltersSort,
    selectArticlesFiltersType,
} from '../model/selectors/articlesFiltersSlice';
import { typeOptions } from '../model/consts/articlesFiltersConsts';

const reducers: ReducersList = {
    articlesFilters: articlesFiltersReducer,
};

interface ArticlesFilterProps {
    className?: string;
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

export const ArticlesFilters = memo((props: ArticlesFilterProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('article');
    const order = useAppSelector(selectArticlesFiltersOrder);
    const sort = useAppSelector(selectArticlesFiltersSort);
    const type = useAppSelector(selectArticlesFiltersType);

    const fetchDatat = useCallback(() => {
        dispatch(fetchNextArticlesPage({ replace: true }));
    }, [dispatch]);

    const sortChange = useCallback(
        (val: ArticleSortField) => {
            dispatch(articlesFiltersActions.setSort(val));
            fetchDatat();
        },
        [dispatch, fetchDatat],
    );

    const orderChange = useCallback(
        (val: SortOrder) => {
            dispatch(articlesFiltersActions.setOrder(val));
            fetchDatat();
        },
        [dispatch, fetchDatat],
    );

    const typeChange = useCallback(
        (chip: ArticleTypeChip) => {
            // TODO: Надо придумать как тут сводить один ко многим или многие ко многим
            // написать какой формат где используется во всём алгоритме (компонент, стэйт, url)
            // ChipOption <-mapper-> typeOption <-> string

            dispatch(articlesFiltersActions.setType(chip));
            fetchDatat();
        },
        [dispatch, fetchDatat],
    );

    return (
        <DynamicModuleLoader
            className={classNames(cls.ArticlesFilters, {}, [className])}
            reducers={reducers}
            removeAfterUnmout={false}
        >
            <div className={cls.row}>
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
            </div>
            {type && <ChipList options={typeOptions} value={type} onClick={typeChange} />}
        </DynamicModuleLoader>
    );
});
