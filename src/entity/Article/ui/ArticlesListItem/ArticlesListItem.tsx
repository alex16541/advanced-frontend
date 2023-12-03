import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Article } from '../../model/types/article';
import { LargeArticleCard } from '../LargeArticleCard/LargeArticleCard';
import { SmallArticleCard } from '../SmallArticleCard/SmallArticleCard';

export enum ArticlesListItemSize {
    S = 'size_s',
    L = 'size_l',
}

interface ArticlesListItemProps {
    className?: string;
    size?: ArticlesListItemSize;
    article?: Article;
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticlesListItem = memo((props: ArticlesListItemProps) => {
    const {
        className, size = ArticlesListItemSize.S, article, isLoading = false, target,
    } = props;

    switch (size) {
        case ArticlesListItemSize.S:
            return <SmallArticleCard target={target} className={className} article={article} isLoading={isLoading} />;

        case ArticlesListItemSize.L:
            return <LargeArticleCard className={className} article={article} isLoading={isLoading} />;

        default:
            return null;
    }
});
