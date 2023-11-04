import { ArticleViewSwitcher, ArticlesList, ArticlesListView } from 'entity/Article';
import { ReactNode, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useOnInit } from 'shared/hooks/useOnInit';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page';
import { Text } from 'shared/ui/Text/Text';
import { ArticleSearch } from 'features/ArticleSearch';
import { ArticlesFilters } from 'features/ArticlesFilters';
import { useSearchParams } from 'react-router-dom';
import {
    selectArticlesPageErrors,
    selectArticlesPageIsLoading,
    selectArticlesPageView,
} from '../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage';
import { articlesPageActions, articlesPageReducer, articlesPageSelectors } from '../model/slices/articlesPageSlice';
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
    const articles = useSelector(articlesPageSelectors.selectAll);
    const isLoading = useSelector(selectArticlesPageIsLoading);
    const view = useSelector(selectArticlesPageView);
    const errors = useSelector(selectArticlesPageErrors);
    const [searchParams] = useSearchParams();

    const loadNextPage = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    const onViewSwitch = useCallback(
        (view: ArticlesListView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch],
    );

    useOnInit(() => {
        dispatch(initArticlesPage(searchParams));
    });

    let content: ReactNode = <ArticlesList view={view} articles={articles} isLoading={isLoading} />;

    if (errors.length > 0) {
        content = <Text title={t('Articles page loading error')} />;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmout={false}>
            <Page className={classNames(cls.ArticlesPage, {}, [className])} onEndOfPage={loadNextPage}>
                <div className={cls.header}>
                    <Text title={t('Article list')} />
                    <ArticleViewSwitcher view={view} onViewSwitch={onViewSwitch} />
                </div>
                <div className={cls.filters}>
                    <ArticleSearch />
                    <ArticlesFilters />
                </div>
                {content}
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
