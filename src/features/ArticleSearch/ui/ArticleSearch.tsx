import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { Input } from 'shared/ui/Input';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'shared/hooks/useDebounce';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { Card } from 'shared/ui/Card/Card';
import { Loader } from 'shared/ui/Loader';
import cls from './ArticleSearch.module.scss';
import { articleSearchActions, articleSearchReducer } from '../model/slieces/articleSearchSlice';
import { selectArticleSearchValue } from '../model/selectors/articleSearchSelectors';

interface ArticleSearchProps {
    className?: string;
    isLoading?: boolean;
}

const reducers: ReducersList = {
    articleSearch: articleSearchReducer,
};

export const ArticleSearch = memo((props: ArticleSearchProps) => {
    const { className, isLoading } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const search = useAppSelector(selectArticleSearchValue);
    const fetchData = useDebounce(() => dispatch(fetchNextArticlesPage({ replace: true })), 500);

    const onChange = useCallback(
        (str) => {
            dispatch(articleSearchActions.setValue(str));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const content = useMemo(() => {
        // TODO: Вынести лоадер внутрь инпута
        if (isLoading) {
            return <Loader className={cls.loader} />;
        }

        return <Input placeholder={t('Search')} value={search} onChange={onChange} />;
    }, [isLoading, t, search, onChange]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmout={false}
            className={classNames(cls.ArticleSearch, {}, [className])}
        >
            <Card>{content}</Card>
        </DynamicModuleLoader>
    );
});
