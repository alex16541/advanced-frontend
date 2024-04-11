import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { ArticlesPageGreeting } from '@/features/ArticlesPageGreeting';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useOnInit } from '@/shared/hooks/useOnInit';
import { StikyContentLayout } from '@/shared/layouts/StikyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import { Text } from '@/shared/ui/deprecated/Text';
import { Page } from '@/widgets/Page';

import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { ArticlesFilters } from '../ArticlesFilters/ArticlesFilters';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';
import { ArticlesViewSwitcherContainer } from '../ArticlesViewSwitcherContainer/ArticlesViewSwitcherContainer';

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
    const [searchParams] = useSearchParams();

    const loadNextPage = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useOnInit(() => {
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmout={false}>
            <FeatureToggle
                feature="isRedesignedApp"
                off={
                    <Page
                        className={classNames(cls.ArticlesPage, {}, [className])}
                        data-testid="articles-page"
                        onEndOfPage={loadNextPage}
                    >
                        <div className={cls.header}>
                            <Text title={t('Article list')} />
                            <ArticlesViewSwitcherContainer />
                        </div>
                        <div className={cls.filters}>
                            <ArticlesFilters />
                        </div>
                        <ArticlesInfiniteList />
                        <ArticlesPageGreeting />
                    </Page>
                }
                on={
                    <Page
                        className={classNames(cls.ArticlesPageRedesigned, {}, [className])}
                        data-testid="articles-page"
                        onEndOfPage={loadNextPage}
                    >
                        <StikyContentLayout
                            left={<ArticlesViewSwitcherContainer />}
                            right={<ArticlesFilters />}
                            content={
                                <div className={cls.content}>
                                    <ArticlesInfiniteList />
                                    <ArticlesPageGreeting />
                                </div>
                            }
                        />
                    </Page>
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
