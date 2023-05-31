import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { article } from 'entity/Article/mock/data';
import cls from './ArticlesList.module.scss';
import { ArticlesListItem, ArticlesListItemSize } from '../ArticlesListItem/ArticlesListItem';
import { Article } from '../../model/types/article';

export enum ArticlesListView {
    GRID = 'grid_view',
    LIST = 'list_view',
}

interface ArticlesListProps {
    className?: string;
    view?: ArticlesListView;
    articles: Article[];
    isLoading?: boolean;
}

const itemSizeByView: Record<ArticlesListView, ArticlesListItemSize> = {
    [ArticlesListView.GRID]: ArticlesListItemSize.S,
    [ArticlesListView.LIST]: ArticlesListItemSize.L,
};

const getSkeleton = (size: ArticlesListItemSize) => new Array(size === ArticlesListItemSize.S ? 9 : 3)
    .fill(0)
    .map((item, index) => <ArticlesListItem key={index} className={cls.card} size={size} isLoading />);

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        className, view = ArticlesListView.LIST, articles, isLoading = false,
    } = props;
    const listItemSize: ArticlesListItemSize = itemSizeByView[view];
    const { t } = useTranslation('article');

    const renderArticle = (article: Article) => (
        <ArticlesListItem key={article.id} className={cls.card} article={article} size={listItemSize} />
    );

    if (isLoading) {
        return (
            <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>{getSkeleton(listItemSize)}</div>
        );
    }

    return (
        <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
            {articles.length > 0 ? articles.map(renderArticle) : t('no articles')}
        </div>
    );
});
