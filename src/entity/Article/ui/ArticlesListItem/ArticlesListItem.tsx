import { memo } from 'react';
import { Article } from '../../model/types/article';
import { LargeArticleCard } from '../LargeArticleCard/LargeArticleCard';
import { SmallArticleCard } from '../SmallArticleCard/SmallArticleCard';

export enum ArticlesListItemSize {
    S = 'size_s',
    L = 'size_l',
}

interface ArticlesListItemProps {
    className?: string;
    size: ArticlesListItemSize;
    article: Article;
    isLoading?: boolean;
}

export const ArticlesListItem = memo((props: ArticlesListItemProps) => {
    const {
        className, size = ArticlesListItemSize.S, article, isLoading = false,
    } = props;

    switch (size) {
        case ArticlesListItemSize.S:
            return <SmallArticleCard className={className} article={article} />;

        case ArticlesListItemSize.L:
            return <LargeArticleCard className={className} article={article} />;

        default:
            return null;
    }
});
