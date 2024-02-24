import { ArticlesList } from 'entity/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text } from 'shared/ui/Text/Text';
import {
    selectArticlesPageErrors,
    selectArticlesPageIsLoading,
    selectArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { articlesPageSelectors } from '../../model/slices/articlesPageSlice';

interface ArticlesInfiniteListProps {
    className?: string;
}

const ArticlesInfiniteList = (props: ArticlesInfiniteListProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const articles = useSelector(articlesPageSelectors.selectAll);
    const isLoading = useSelector(selectArticlesPageIsLoading);
    const errors = useSelector(selectArticlesPageErrors);
    const view = useSelector(selectArticlesPageView);

    if (errors.length > 0) {
        return <Text title={t('Articles page loading error')} />;
    }

    return (
        <ArticlesList className={className} view={view} articles={articles} isLoading={isLoading} />
    );
};

const ArticlesInfiniteListMemoized = memo(ArticlesInfiniteList);

export { ArticlesInfiniteListMemoized as ArticlesInfiniteList };
