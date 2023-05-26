import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
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

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        className, view = ArticlesListView.LIST, articles, isLoading = false,
    } = props;
    const listItemSize: ArticlesListItemSize = itemSizeByView[view];
    const { t } = useTranslation('article');

    const renderArticle = (article: Article) => (
        <ArticlesListItem className={cls.card} article={article} size={listItemSize} />
    );

    return (
        <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
            {articles.length > 0 ? articles.map(renderArticle) : t('no articles')}
        </div>
    );
});
