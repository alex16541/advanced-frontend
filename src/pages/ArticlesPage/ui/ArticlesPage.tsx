import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleViewSwitcher, ArticlesList, ArticlesListView } from 'entity/Article';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useOnInit } from 'shared/hooks/useOnInit';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import cls from './ArticlesPage.module.scss';
import { articlesPageActions, articlesPageReducer, articlesPageSelectors } from '../model/slices/articlesPageSlice';
import { fetchArticlesList } from '../model/services/fetchArticlesList';
import {
    selectArticlesPageErrors,
    selectArticlesPageIsLoading,
    selectArticlesPageView,
} from '../model/selectors/articlesPageSelectors';

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

    useOnInit(() => {
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList());
    });

    const onViewSwitch = useCallback(
        (view: ArticlesListView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <div className={cls.header}>
                    <Text title={t('Article list')} />
                    <ArticleViewSwitcher view={view} onViewSwitch={onViewSwitch} />
                </div>
                <ArticlesList view={view} articles={articles} isLoading={isLoading} />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
