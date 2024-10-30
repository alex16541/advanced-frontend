import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { getArticleDetailsData } from '@/entity/Article';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { StikyContentLayout } from '@/shared/layouts/StikyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleDetails } from '@/widgets/ArticleDetails';
import { Page } from '@/widgets/Page';

import { ArticleInfo } from '../ArticleInfo/ArticleInfo';

import cls from './ArticleDetailsPage.module.scss';
import '../../i18n/i18n';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
    const { className } = props;
    let { id } = useParams<{ id: string }>();
    const { t } = useTranslation('ArticleDetailsPage');

    const article = useAppSelector(getArticleDetailsData);

    if (__PROJECT__ === 'storybook') id = '1';

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Text title={t('NOT_FOUND')} />
            </div>
        );
    }

    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <StikyContentLayout
                right={<ArticleInfo articleId={id} />}
                content={
                    <div className={cls.content}>
                        <ArticleDetails articleId={id} />
                        {article && <ArticleRating articleId={id} />}
                        <ArticleRecommendationsList />
                        {article && <ArticleCommentsList articleId={id} />}
                    </div>
                }
            />
        </Page>
    );
});

export default ArticleDetailsPage;
