import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticlesList, ArticlesListView } from '@/entity/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';

import { useFetchArticleRecommendationsQuery } from '../api/recommendationsApi';

import cls from './ArticleRecommendationsList.module.scss';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article');

    const { data: recommendations = [], isLoading, isError } = useFetchArticleRecommendationsQuery();

    // TODO: Поменять обработку ошибки на что-то красивое
    if (isError) return null;
    return (
        <div
            className={classNames(cls.ArticleRecommendationsList, {}, [className])}
            data-testid="ArticleRecommendationsList"
        >
            <Text size="l" title={t('recommendations')} weight="bold" />
            <div className={cls.list}>
                <ArticlesList
                    articles={recommendations}
                    isLoading={isLoading}
                    target="_blank"
                    view={ArticlesListView.CARUSEL}
                />
            </div>
        </div>
    );
});
