import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { featureToggle } from '@/shared/lib/features';

import { ArticlesListView } from '../../model/consts/article';
import { Article } from '../../model/types/article';
import { ArticlesListItem, ArticlesListItemSize } from '../ArticlesListItem/ArticlesListItem';

import cls from './ArticlesList.module.scss';

export const ArticlesListCountPeerView: Record<ArticlesListView, number> = {
    [ArticlesListView.GRID]: 12,
    [ArticlesListView.LIST]: 3,
    [ArticlesListView.CARUSEL]: 6,
};

interface ArticlesListProps {
    className?: string;
    view?: ArticlesListView;
    articles: Article[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
}

const itemSizeByView: Record<ArticlesListView, ArticlesListItemSize> = {
    [ArticlesListView.GRID]: ArticlesListItemSize.S,
    [ArticlesListView.LIST]: ArticlesListItemSize.L,
    [ArticlesListView.CARUSEL]: ArticlesListItemSize.S,
};

const getSkeleton = (size: ArticlesListItemSize) =>
    new Array(size === ArticlesListItemSize.S ? 12 : 3)
        .fill(0)
        .map((item, index) => <ArticlesListItem className={cls.card} key={index} size={size} isLoading />);

export const ArticlesList = memo((props: ArticlesListProps) => {
    const { className, view = ArticlesListView.LIST, articles, isLoading = false, target } = props;
    const listItemSize: ArticlesListItemSize = itemSizeByView[view];
    const { t } = useTranslation('article');

    const renderArticle = (article: Article) => (
        <ArticlesListItem
            article={article}
            className={cls.card}
            key={article.id}
            size={listItemSize}
            target={target}
        />
    );

    return (
        <div
            data-testid="ArticlesList"
            className={classNames(
                featureToggle({
                    name: 'isRedesignedApp',
                    on: () => cls.ArticlesListRedesigned,
                    off: () => cls.ArticlesList,
                }),
                {},
                [className, cls[view]],
            )}
        >
            {articles.length > 0 ? articles.map(renderArticle) : !isLoading && t('no articles')}
            {isLoading && getSkeleton(listItemSize)}
        </div>
    );
});
