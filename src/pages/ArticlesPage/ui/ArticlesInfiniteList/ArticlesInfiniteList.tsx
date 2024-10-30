import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticlesList } from '@/entity/Article';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import {
    selectArticlesPageErrors,
    selectArticlesPageIsLoading,
    selectArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { articlesPageActions, articlesPageSelectors } from '../../model/slices/articlesPageSlice';

interface ArticlesInfiniteListProps {
    className?: string;
}

const ArticlesInfiniteList = (props: ArticlesInfiniteListProps) => {
    const { className } = props;
    const { t } = useTranslation('ArticlesPage');
    const dispatch = useAppDispatch();
    const articles = useSelector(articlesPageSelectors.selectAll);
    const isLoading = useSelector(selectArticlesPageIsLoading);
    const errors = useSelector(selectArticlesPageErrors);
    const view = useSelector(selectArticlesPageView);

    const onReload = useCallback(() => {
        dispatch(articlesPageActions.resetErrors());
        dispatch(fetchNextArticlesPage({ replace: true }));
    }, [dispatch]);

    if (errors.length > 0) {
        return (
            <VStack align="Center" gap="16" maxWidth>
                <Text title={t('PAGE_LOADIN_UNKNOWN_ERROR')} />
                <Button onClick={onReload}>{t('Try agen')}</Button>
            </VStack>
        );
    }

    return <ArticlesList articles={articles} className={className} isLoading={isLoading} view={view} />;
};

const ArticlesInfiniteListMemoized = memo(ArticlesInfiniteList);

export { ArticlesInfiniteListMemoized as ArticlesInfiniteList };
