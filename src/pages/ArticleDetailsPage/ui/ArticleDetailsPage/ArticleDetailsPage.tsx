import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entity/Article';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { StikyContentLayout } from '@/shared/layouts/StikyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleInfo } from '../ArticleInfo/ArticleInfo';

import cls from './ArticleDetailsPage.module.scss';

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
        
                        <Page className={classNames(cls.ArticleDetailsPageRedesigned, {}, [className])}>
                            <StikyContentLayout
                                left={<ArticleDetailsPageHeader articleId={id} />}
                                right={<ArticleInfo articleId={id} />}
                                content={
                                    <div className={cls.container}>
                                        <ArticleDetails articleId={id} />
                                        <ArticleRating articleId={id} />
                                        <ArticleRecommendationsList />
                                        <ArticleCommentsList articleId={id} />
                                    </div>
                                }
                            />
                        </Page>
                    
    );
});

export default ArticleDetailsPage;
