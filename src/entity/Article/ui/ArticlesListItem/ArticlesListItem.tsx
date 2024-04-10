import { HTMLAttributeAnchorTarget, memo } from 'react';

import { featureToggle } from '@/shared/lib/features';

import { Article } from '../../model/types/article';
import { LargeArticleCard as LargeArticleCardRedesigned } from '../LargeArticleCard/LargeArticleCard';
import { LargeArticleCard as LargeArticleCardDeprecated } from '../LargeArticleCardDeprecated/LargeArticleCard';
import { SmallArticleCard as SmallArticleCardRedesigned } from '../SmallArticleCard/SmallArticleCard';
import { SmallArticleCard as SmallArticleCardDeprecated } from '../SmallArticleCardDeprecated/SmallArticleCard';

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
    const { className, size = ArticlesListItemSize.S, article, isLoading = false, target } = props;

    const SmallArticleCard = featureToggle({
        name: 'isRedesignedApp',
        on: () => SmallArticleCardRedesigned,
        off: () => SmallArticleCardDeprecated,
    });
    const LargeArticleCard = featureToggle({
        name: 'isRedesignedApp',
        on: () => LargeArticleCardRedesigned,
        off: () => LargeArticleCardDeprecated,
    });

    if (!SmallArticleCard || !LargeArticleCard) return null;

    switch (size) {
        case ArticlesListItemSize.S:
            return (
                <SmallArticleCard
                    article={article}
                    className={className}
                    isLoading={isLoading}
                    target={target}
                />
            );

        case ArticlesListItemSize.L:
            return <LargeArticleCard article={article} className={className} isLoading={isLoading} />;

        default:
            return null;
    }
});
