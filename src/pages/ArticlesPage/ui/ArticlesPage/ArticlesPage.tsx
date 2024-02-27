import { ArticleViewSwitcher, ArticlesListView } from 'entity/Article';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useOnInit } from 'shared/hooks/useOnInit';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page';
import { useDebounce } from 'shared/hooks/useDebounce';
import { ArticlesFilters } from '../ArticlesFilters/ArticlesFilters';
import {
    selectArticlesPageIsInitialLoading, selectArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageActions, articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';
import cls from './ArticlesPage.module.scss';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const isInitialLoading = useSelector(selectArticlesPageIsInitialLoading);
    const view = useSelector(selectArticlesPageView);
    const [searchParams] = useSearchParams();

    const loadNextPage = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    const onSearch = useDebounce(() => dispatch(fetchNextArticlesPage({ replace: true })), 500);

    const onViewSwitch = useCallback(
        (view: ArticlesListView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch],
    );

    useOnInit(() => {
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmout={false}>
            <Page className={classNames(cls.ArticlesPage, {}, [className])} onEndOfPage={loadNextPage}>
                <div className={cls.header}>
                    <Text title={t('Article list')} />
                    <ArticleViewSwitcher view={view} onViewSwitch={onViewSwitch} />
                </div>
                <div className={cls.filters}>
                    <ArticlesFilters isLoading={isInitialLoading} onLoadData={onSearch} />
                </div>
                <ArticlesInfiniteList />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
