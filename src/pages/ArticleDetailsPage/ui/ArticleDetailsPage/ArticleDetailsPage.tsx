import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleDetails } from '@/entity/Article';
import { Text } from '@/shared/ui/Text/Text';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { Page } from '@/widgets/Page';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import cls from './ArticleDetailsPage.module.scss';

import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
    const { className } = props;
    let { id } = useParams<{ id: string }>();
    const { t } = useTranslation('article');

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
                <ArticleDetailsPageHeader />
                <ArticleDetails articleId={id} />
                <ArticleRecommendationsList />
                <ArticleCommentsList articleId={id} />
            </div>
        </Page>
    );
});

export default ArticleDetailsPage;
