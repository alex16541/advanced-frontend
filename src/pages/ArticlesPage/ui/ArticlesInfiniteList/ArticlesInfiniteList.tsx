import { ArticlesList } from '@/entity/Article';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui/Text/Text';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {
    selectArticlesPageErrors,
    selectArticlesPageIsLoading,
    selectArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { articlesPageActions, articlesPageSelectors } from '../../model/slices/articlesPageSlice';

interface ArticlesInfiniteListProps {
    className?: string;
}

const ArticlesInfiniteList = (props: ArticlesInfiniteListProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
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
            <VStack max gap="16" align="Center">
                <Text title={t('Articles page loading error')} />
                <Button onClick={onReload}>{t('Try agen')}</Button>
            </VStack>
        );
    }

    return (
        <ArticlesList className={className} view={view} articles={articles} isLoading={isLoading} />
    );
};

const ArticlesInfiniteListMemoized = memo(ArticlesInfiniteList);

export { ArticlesInfiniteListMemoized as ArticlesInfiniteList };
