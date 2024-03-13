import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { RatingCard } from '@/entity/Rating';
import { getAuthData } from '@/entity/User';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';

import { useGetArticleRatingQuery, useRateArticleMutation } from '../api/articleRating';

import cls from './ArticleRating.module.scss';

export interface ArticleRatingProps {
    className?: string;
    articleId: string | number;
}

const ArticleRating = (props: ArticleRatingProps & {userId: string | number}) => {
    const { className, articleId, userId } = props;
    const { t } = useTranslation('article');

    const [rateArticle] = useRateArticleMutation();
    const { data = [], isLoading } = useGetArticleRatingQuery({ articleId, userId });
    const rating = Number(data[0]?.rating);

    const onAccept = useCallback((rating: number, feedback?: string) => {
        rateArticle({
            articleId,
            userId,
            rating,
            feedback: feedback ?? '',
        }).catch((e) => console.log(e));
    }, [articleId, rateArticle, userId]);

    if (isLoading) {
        return <Skeleton className={cls.Skeleton} height="150px" width="100%" />;
    }

    return (
        <RatingCard
            acceptText={t('Rate')}
            className={classNames(cls.ArticleRating, {}, [className])}
            disabled={Boolean(rating)}
            feedbackPlaceholder={t('Feedback placeholder')}
            rating={rating}
            title={t('Rate this article')}
            onAccept={onAccept}
        />
    );
};

const ArticleRatingWithAuthData = (props: ArticleRatingProps) => {
    const userData = useAppSelector(getAuthData);

    if (!userData?.id) return null;

    return (
        <ArticleRating userId={userData.id} {...props} />
    );
};

const Memoized = memo(ArticleRatingWithAuthData);

export default Memoized;
