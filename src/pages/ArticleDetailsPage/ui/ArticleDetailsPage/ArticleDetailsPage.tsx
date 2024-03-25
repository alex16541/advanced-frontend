import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entity/Article';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getFeatureFlag } from '@/shared/lib/features';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
    const { className } = props;
    let { id } = useParams<{ id: string }>();
    const { t } = useTranslation('article');

    const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');

    if (__PROJECT__ === 'storybook') id = '1';

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Text title={t('article not found')} />
            </div>
        );
    }

    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <div className={cls.container}>
                <ArticleDetailsPageHeader articleId={id} />
                <ArticleDetails articleId={id} />
                {isArticleRatingEnabled && <ArticleRating articleId={id} />}
                <ArticleRecommendationsList />
                <ArticleCommentsList articleId={id} />
            </div>
        </Page>
    );
});

export default ArticleDetailsPage;
