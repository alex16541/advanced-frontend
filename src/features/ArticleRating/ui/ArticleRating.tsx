import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { RatingCard } from '@/entity/Rating';
import { getAuthData } from '@/entity/User';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { useGetArticleRatingQuery, useRateArticleMutation } from '../api/articleRating';

import cls from './ArticleRating.module.scss';
import '../i18n/i18n';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = (props: ArticleRatingProps & { userId: string | number }) => {
    const { className, articleId, userId } = props;
    const { t } = useTranslation('ArticleRating');

    const [rateArticle] = useRateArticleMutation();

    const { data = [], isLoading, error } = useGetArticleRatingQuery({ articleId, userId });

    const onAccept = useCallback(
        async (rating: number, feedback?: string) => {
            try {
                await rateArticle({
                    articleId,
                    userId,
                    rating,
                    feedback: feedback ?? '',
                });
            } catch (e) {
                console.log(e);
            }
        },
        [articleId, rateArticle, userId],
    );

    const rate = useMemo(() => Number(data[0]?.rating), [data]);

    if (error) return null;

    if (isLoading) return <Skeleton className={cls.Skeleton} height="150px" width="100%" />;

    return (
        <RatingCard
            acceptText={t('Rate')}
            className={classNames(cls.ArticleRating, {}, [className])}
            disabled={Boolean(rate)}
            feedbackPlaceholder={t('Feedback placeholder')}
            rating={rate}
            title={t('Rate this article')}
            onAccept={onAccept}
        />
    );
};

const ArticleRatingWithAuthData = (props: ArticleRatingProps) => {
    const userData = useAppSelector(getAuthData);

    if (!userData?.id) return null;

    return <ArticleRating userId={userData.id} {...props} />;
};

const Memoized = memo(ArticleRatingWithAuthData);

export default Memoized;
