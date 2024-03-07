import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRating.module.scss';
import { RatingCard } from '@/entity/Rating';
import { useGetArticleRatingQuery, useRateArticleMutation } from '../api/articleRating';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { getAuthData } from '@/entity/User';
import { Skeleton } from '@/shared/ui/Skeleton';

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
        return <Skeleton className={cls.Skeleton} width="100%" height="150px" />;
    }

    return (
        <RatingCard
            className={classNames(cls.ArticleRating, {}, [className])}
            rating={rating}
            disabled={Boolean(rating)}
            title={t('Rate this article')}
            feedbackPlaceholder={t('Feedback placeholder')}
            acceptText={t('Rate')}
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
